import { useState, useEffect } from "react";
import FaceCam from "./FaceCam";
import CameraInstructions from "./CameraInstructions";

function MainBody() {
  const initialDivClass =
    "flex flex-col items-center justify-start w-full rounded-lg";
  const [permitState, setPermitState] = useState("");
  const [divClass, setDivClass] = useState(initialDivClass);
  const [component, setComponent] = useState(null);

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

  useEffect(() => {
    // if permitState is set and granted, show face cam else show camera instructions
    if (permitState !== "" && permitState === "granted") {
      setComponent(<FaceCam />);
      setDivClass(divClass + " h-96");
    } else if (permitState !== "" && permitState !== "granted") {
      setComponent(<CameraInstructions />);
      setDivClass(divClass + " h-fit");
    }
  }, [permitState]);

  return (
    <>
      <div className={divClass}>{component}</div>
    </>
  );
}

export default MainBody;
