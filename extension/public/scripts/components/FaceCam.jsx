import { useState, useEffect, useRef } from "react";

function FaceCam() {
  const [faceStream, setFaceStream] = useState(null);
  const videoRef = useRef(null); //setting a reference object to assign later to video element

  useEffect(() => {
    // to get stream and assign its data to our component state
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
    // if we have vid element identified and stream also set
    if (videoRef.current && faceStream) {
      videoRef.current.srcObject = faceStream;
    }
  }, [faceStream]);
  return (
    <>
      <div className="flex items-center justify-center w-80 h-80 rounded-lg border border-purple-400">
        <video
          className="h-80 w-80 object-cover rounded-lg"
          ref={videoRef}
          autoPlay></video>
      </div>
    </>
  );
}

export default FaceCam;
