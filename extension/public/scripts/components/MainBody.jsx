import { useState, useEffect } from "react";
import FaceCam from "./FaceCam";
import CameraInstructions from "./CameraInstructions";

function MainBody() {
  const [permitState, setPermitState] = useState("");
  let component;
  useEffect(() => {
    async function getCamPermissionState() {
      // get the permission state of camera and set it to a component state
      try {
        const { state } = await navigator.permissions.query({ name: "camera" });
        setPermitState(state);
      } catch (err) {
        console.log(err);
      }
    }
    getCamPermissionState();
  }, []);

  if (permitState === "granted") {
    // set component based on permitState
    component = <FaceCam />;
  } else {
    component = <CameraInstructions />;
  }

  return (
    <>
      <div className="border border-yellow-400 flex flex-col items-center justify-start w-full h-96 rounded-lg">
        {component}
      </div>
    </>
  );
}

export default MainBody;
