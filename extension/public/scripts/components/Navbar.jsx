import DeleteAccount from "./DeleteAccount";
import OnlineStatus from "./OnlineStatus";
import RetakePhoto from "./RetakePhoto";
import ToggleAutofill from "./ToggleAutofill";

function Navbar() {
  return (
    <>
      <div className="justify-between rounded-2xl px-2 items-center flex basis-4/12">
        <OnlineStatus />
        <RetakePhoto />
        <DeleteAccount />
      </div>
    </>
  );
}

export default Navbar;
