import OnlineStatus from "./OnlineStatus";
import RetakePhoto from "./RetakePhoto";
import ToggleAutofill from "./ToggleAutofill";

function Navbar() {
  return (
    <>
      <div className="bg-rose-300 justify-between rounded-2xl px-2 items-center flex basis-5/12">
        <OnlineStatus />
        <RetakePhoto />
      </div>
    </>
  );
}

export default Navbar;
