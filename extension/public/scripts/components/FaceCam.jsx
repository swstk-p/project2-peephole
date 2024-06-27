import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { DrawBoxOptions } from "face-api.js/build/es6/draw/DrawBox";

function FaceCam() {
  const [faceStream, setFaceStream] = useState(null);
  const [faceDetection, setFaceDetection] = useState(undefined);
  const videoRef = useRef(null); //setting a reference object to assign later to video element
  const canvasRef = useRef(null);
  const imgSizes = [32, 64, 96, 128, 160, 192, 224, 256];
  useEffect(() => {
    // to get stream
    async function getCamStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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
    }
    loadModel();
  }, []);

  useEffect(() => {
    // function to detect face
    async function detectFace() {
      if (videoRef.current && faceStream && videoRef.current.readyState === 4) {
        try {
          for (const size of imgSizes) {
            const detection = await faceapi.detectSingleFace(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions({ inputSize: size })
            );
            setFaceDetection(detection);
          }
        } catch (err) {
          console.log(`DETECTION ERROR: ${err}`);
        }
      }
    }

    // to detect periodically
    if (faceStream) {
      const interval = setInterval(() => {
        detectFace();
      }, 50);
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
      // resize detections to match video dimensions
      const resizedDetection = faceapi.resizeResults(faceDetection, {
        width: videoRef.current.getBoundingClientRect().width,
        height: videoRef.current.getBoundingClientRect().height,
      });
      // create a DrawBox obj using resizedDetection's box and DrawBoxOptions
      const drawBox = new faceapi.draw.DrawBox(
        resizedDetection.box,
        new DrawBoxOptions({ boxColor: "#5efc03", lineWidth: 2 })
      );
      // draw on the canvas with drawBox
      drawBox.draw(canvasRef.current);
    }
  }, [faceDetection]);

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-full rounded-lg">
        <video
          className="flex w-full aspect-square object-none rounded-lg z-0"
          ref={videoRef}
          autoPlay></video>
        <canvas className="rounded-lg absolute z-10" ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default FaceCam;
