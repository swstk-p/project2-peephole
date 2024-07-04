import { useState, useEffect } from "react";
import FaceCam from "./FaceCam";
import CameraInstructions from "./CameraInstructions";

/**
 * React component to display the extension's main body.
 * @returns extension main body jsx
 */
function MainBody() {
  const initialDivClass =
    "px-5 pb-1 flex flex-col items-center justify-start w-full rounded-lg";
  const [permitState, setPermitState] = useState("");
  const [divClass, setDivClass] = useState(initialDivClass);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    /**
     * Obtains the state for extension's camera permission and sets it to component permission state.
     * @async
     * @returns undefined
     */
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
