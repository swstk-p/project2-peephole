import Instruction from "./Instruction";

function CameraInstructions() {
  let instructions = [
    {
      directionElem: true,
      direction: (
        <span>
          1. Go to{" "}
          <a className="underline font-semibold text-underline">
            extension settings
          </a>
          .
        </span>
      ),
      imgSrc: null,
    },
    {
      directionElem: false,
      direction: "2. Locate the Privacy and security setting.",
      imgSrc: "../../images/instruction1.png",
    },
    {
      directionElem: false,
      direction: "3. Navigate to the camera section.",
      imgSrc: "../../images/instruction2.png",
    },
    {
      directionElem: false,
      direction: "4. Set the permission to Allow.",
      imgSrc: "../../images/instruction3.png",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center w-full h-fit rounded-lg">
        <span className="my-1 text-xs font-semibold ">
          This extension requires camera permissions to recognize you.
        </span>
        <div className="space-y-4 mt-3 mb-2 px-6 flex flex-col items-start w-full h-fit rounded-lg">
          {instructions.map(function (data) {
            return (
              <Instruction
                directionElem={data.directionElem}
                direction={data.direction}
                imgSrc={data.imgSrc}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CameraInstructions;
