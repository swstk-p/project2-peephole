import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function FaceCam() {
  const [faceStream, setFaceStream] = useState(null);
  const videoRef = useRef(null); //setting a reference object to assign later to video element
  const imgSizes = Array(20)
    .fill(0)
    .map((_, index) => index + 1);
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
    // to detect face
    async function detectFace() {
      if (videoRef.current && faceStream && videoRef.current.readyState === 4) {
        try {
          imgSizes.map(
            async (imgFactor) =>
              await faceapi.detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions({
                  inputSize: imgFactor * 32,
                })
              )
          );
        } catch (err) {
          console.log(`DETECTION ERROR: ${err}`);
        }
      }
    }

    // to detect periodically
    const interval = setInterval(detectFace, 100);
    // to clean up interval on component unload
    return () => clearInterval(interval);
  }, [faceStream]);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full rounded-lg">
        <video
          className="w-full aspect-square object-cover rounded-lg"
          ref={videoRef}
          autoPlay></video>
      </div>
    </>
  );
}

export default FaceCam;
