import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { DrawBoxOptions } from "face-api.js/build/es6/draw/DrawBox";

/**
 *React component to display camera stream.
 * @returns webcam feed jsx
 */
function FaceCam() {
  const [faceStream, setFaceStream] = useState(null);
  const [faceDetection, setFaceDetection] = useState(undefined);
  const [boxDrawn, setBoxDrawn] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const videoRef = useRef(null); //setting a reference object to assign later to video element
  const canvasRef = useRef(null);
  const streamObj = { width: 1280, height: 720 };

  /**
   * Calculates new coordinates for a given box based on size and offset factors.
   * @param {*} box the box whose coordinates are to be calculated
   * @param {*} sizeFactor the factor by which the height of box is adjusted
   * @param {*} yOffsetFactor the factor by which the box vertical position is offset
   * @returns coordinates object {left, top, right, bottom}
   */
  function calculateBoxCoordinates(box, sizeFactor, yOffsetFactor) {
    const boxSize = box.height + box.height * sizeFactor;
    const yOffsetSize = box.height * yOffsetFactor;
    return {
      left: box.x - parseFloat(boxSize - box.width) / 2,
      top: box.y - parseFloat(boxSize - box.height) / 2 - yOffsetSize,
      right: box.x - parseFloat(boxSize - box.width) / 2 + boxSize,
      bottom:
        box.y - parseFloat(boxSize - box.height) / 2 - yOffsetSize + boxSize,
    };
  }
  /**
   * Provides a box with default size and offset vertical position.
   * @param {*} faceDetection detection object
   * @returns DrawBox object of default size and offset vertical position
   */
  function getDefaultBox(faceDetection) {
    const offsetFactor = 0.18;
    // resize detections to match video dimensions
    const resizedDetection = faceapi.resizeResults(faceDetection, {
      width: videoRef.current.getBoundingClientRect().width,
      height: videoRef.current.getBoundingClientRect().height,
    });
    const offSetSize = offsetFactor * resizedDetection.alignedRect.box.height;
    const left = resizedDetection.alignedRect.box.x;
    const top = resizedDetection.alignedRect.box.y - offSetSize;
    const right = left + resizedDetection.alignedRect.box.width;
    const bottom = top + resizedDetection.alignedRect.box.height;

    const defaultBox = new faceapi.draw.DrawBox(
      new faceapi.Box(
        new faceapi.BoundingBox(left, top, right, bottom, false),
        false
      ),
      new DrawBoxOptions({ boxColor: "red", lineWidth: 2 })
    );
    return defaultBox;
  }
  /**
   * Provides a box object with adjusted size and offset vertical position
   * @param {*} faceDetection detection object
   * @returns DrawBox object with adjusted size and offset vertical position
   */
  function getAdjustedBox(faceDetection) {
    const sizeFactor = 1.0;
    const yOffsetFactor = 0.18;
    // resize detections to match video dimensions
    const resizedDetection = faceapi.resizeResults(faceDetection, {
      width: videoRef.current.getBoundingClientRect().width,
      height: videoRef.current.getBoundingClientRect().height,
    });
    const { left, top, right, bottom } = calculateBoxCoordinates(
      resizedDetection.alignedRect.box,
      sizeFactor,
      yOffsetFactor
    );
    return new faceapi.draw.DrawBox(
      new faceapi.Box(
        new faceapi.BoundingBox(left, top, right, bottom, false),
        false
      ),
      new DrawBoxOptions({ boxColor: "#5efc03", lineWidth: 1.5 })
    );
  }

  useEffect(() => {
    /**
     * Obtains webcam video stream and sets component stream state.
     * @async
     * @returns undefined
     */
    async function getCamStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: streamObj.width,
            height: streamObj.height,
          },
          audio: false,
        });
        setFaceStream(stream);
      } catch (err) {
        console.log(err.message);
      }
    }

    getCamStream();
  }, []); //empty array so that this useEffect is run only once

  useEffect(() => {
    // to assign stream to our component
    // if we have vid element identified and stream also set
    if (videoRef.current && faceStream) {
      videoRef.current.srcObject = faceStream;
    }
  }, [faceStream]);

  useEffect(() => {
    /**
     * Loads detector models and sets component loaded state.
     * @returns undefined
     * @async
     */
    async function loadModel() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("../../models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("../../models");
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri("../../models");
      setModelsLoaded(true);
    }
    loadModel();
  }, []);

  useEffect(() => {
    /**
     * Detects face and sets component detection state.
     * @async
     * @returns undefined
     */
    async function detectFace() {
      if (
        videoRef.current &&
        faceStream &&
        videoRef.current.readyState === 4 &&
        modelsLoaded
      ) {
        try {
          const detection = await faceapi
            .detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions({
                size: 96,
                scoreThreshold: 0.3,
              })
            )
            .withFaceLandmarks(true);
          setFaceDetection(detection);
        } catch (err) {
          console.log(`DETECTION ERROR: ${err}`);
        }
      }
    }

    // to detect periodically
    if (faceStream) {
      const interval = setInterval(() => {
        detectFace();
      }, 75);
      // to clean up interval on component unload
      return () => clearInterval(interval);
    }
  }, [faceStream]);

  useEffect(() => {
    // to set canvas size and position
    if (videoRef.current && canvasRef.current) {
      const vidWidth = videoRef.current.getBoundingClientRect().width;
      const vidHeight = videoRef.current.getBoundingClientRect().height;
      canvasRef.current.width = vidWidth;
      canvasRef.current.height = vidHeight;
    }
  }, [videoRef, canvasRef]);

  useEffect(() => {
    // erase rectangle if face detection changes
    canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    // set component drawn state false
    setBoxDrawn(false);
    // display canvas if face detected
    if (faceDetection !== undefined) {
      const drawBox = getAdjustedBox(faceDetection);
      // draw on the canvas with drawBox
      drawBox.draw(canvasRef.current);
      setBoxDrawn(true);
      // logging
      console.log("DRAWN");
    }
  }, [faceDetection]);

  useEffect(() => {
    /**
     *
     * @param {*} box box obtained after adjusting it
     * @returns object with mappedX, mappedY, mappedWidth and mappedHeight
     */
    function mapVideoToStreamCoordinates(box) {
      const mappedHeight =
        (box.box.height * streamObj.height) /
        videoRef.current.getBoundingClientRect().height; //scaling box to video element and mapping to stream height
      const mappedWidth =
        (box.box.width * streamObj.height) /
        videoRef.current.getBoundingClientRect().width; //scaling box to video element but mapping to stream height to keep it square
      const mappedX =
        (box.box.x * streamObj.width) /
          videoRef.current.getBoundingClientRect().width +
        mappedWidth / 3; // locating coordinate in terms of video -> mapping it to stream (gives width to make a rectangle) -> reducing it to mappedWidth and centering the needed portion (making it a square)
      const mappedY =
        (box.box.y * streamObj.height) /
        videoRef.current.getBoundingClientRect().height; // locating coordinate in terms of video -> mapping it to stream

      return {
        mappedX: mappedX,
        mappedY: mappedY,
        mappedWidth: mappedWidth,
        mappedHeight: mappedHeight,
      };
    }

    // effect to download detected face
    if (boxDrawn && videoRef.current) {
      // get coordinates of the detection box
      const adjustedBox = getAdjustedBox(faceDetection);
      // create canvas element on which the detection box image is drawn
      const canvas = document.createElement("canvas");
      canvas.width = canvasRef.current.width;
      canvas.height = canvasRef.current.height;
      const ctx = canvas.getContext("2d");
      const { mappedX, mappedY, mappedWidth, mappedHeight } =
        mapVideoToStreamCoordinates(adjustedBox, canvas);
      // draw image on canvas so that it can be set as a URL
      ctx.drawImage(
        videoRef.current,
        mappedX,
        mappedY,
        mappedWidth,
        mappedHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      // save the image as url on an <a> element
      const a = document.createElement("a");
      const imgDataURL = canvas.toDataURL();
      a.href = imgDataURL;
      // debug commented
      chrome.tabs.create({
        url: a.href,
      });
    }
  }, [boxDrawn]);

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-full rounded-lg">
        <video
          className="flex w-full aspect-square object-cover rounded-lg z-10"
          ref={videoRef}
          autoPlay></video>
        <canvas className="rounded-lg absolute z-20" ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default FaceCam;

/* 
  STEPS FOR BOUNDING BOX
  1. declare a ref
  2. put a canvas element and useRef
  3. set canvas size and position (effect depends on stream and ref value)
  4. clear canvas -> adjust box -> draw the box (effect depends on detection value)
*/
