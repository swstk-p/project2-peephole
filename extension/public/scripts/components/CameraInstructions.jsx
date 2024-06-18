function CameraInstructions() {
  return (
    <>
      <div className="flex flex-col items-center w-full h-96 rounded-lg">
        <span className="my-1 text-xs font-semibold ">
          This extension requires camera permissions to recognize you.
        </span>
        <div className="space-y-4 mt-3 px-6 text-lg flex flex-col items-start w-full h-80 rounded-lg">
          <span>
            1. Go to{" "}
            <a className="underline font-semibold text-underline">
              extension settings
            </a>
            .
          </span>
          <span>2. Locate the Privacy and security tab.</span>
          <img
            src="../../images/instruction1.png"
            className="w-full h-24 object-cover"
          />
          <span>3. Locate the Camera section.</span>
          <img
            src="../../images/instruction2.png"
            className="w-full h-24 object-cover"
          />
          <span>4. Change the permission to Allow.</span>
          <img
            src="../../images/instruction3.png"
            className="w-full h-24 object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default CameraInstructions;
