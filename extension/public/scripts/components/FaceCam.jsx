import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { DrawBoxOptions } from "face-api.js/build/es6/draw/DrawBox";

function FaceCam() {
  const [faceStream, setFaceStream] = useState(null);
  const [faceDetection, setFaceDetection] = useState(undefined);
  const videoRef = useRef(null); //setting a reference object to assign later to video element
  const canvasRef = useRef(null);

  function adjustBox() {
    const boxSize = 150;
    const heightOffset = 50;
    // resize detections to match video dimensions
    const resizedDetection = faceapi.resizeResults(faceDetection, {
      width: videoRef.current.getBoundingClientRect().width,
      height: videoRef.current.getBoundingClientRect().height,
    });
    return new faceapi.draw.DrawBox(
      new faceapi.Box(
        new faceapi.BoundingBox(
          resizedDetection.alignedRect.box.x -
            parseFloat(boxSize - resizedDetection.alignedRect.box.width) / 2,
          resizedDetection.alignedRect.box.y -
            parseFloat(boxSize - resizedDetection.alignedRect.box.height) / 2 -
            heightOffset,
          resizedDetection.alignedRect.box.x + boxSize,
          resizedDetection.alignedRect.box.y + boxSize,
          false
        ),
        false
      ),
      new DrawBoxOptions({ boxColor: "#5efc03", lineWidth: 1.5 })
    );
  }

  useEffect(() => {
    // to get stream
    async function getCamStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
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
    // to load models
    async function loadModel() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("../../models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("../../models");
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri("../../models");
    }
    loadModel();
  }, []);

  useEffect(() => {
    // function to detect face
    async function detectFace() {
      if (videoRef.current && faceStream && videoRef.current.readyState === 4) {
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
    // display canvas if face detected
    if (faceDetection !== undefined) {
      const drawBox = adjustBox();
      // draw on the canvas with drawBox
      drawBox.draw(canvasRef.current);
    }
  }, [faceDetection]);

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-full rounded-lg">
        <video
          className="flex w-full aspect-square object-cover rounded-lg z-0"
          ref={videoRef}
          autoPlay></video>
        <canvas className="rounded-lg absolute z-10" ref={canvasRef}></canvas>
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
