import DeleteAccount from "./DeleteAccount";
import OnlineStatus from "./OnlineStatus";
import RetakePhoto from "./RetakePhoto";
import ToggleAutofill from "./ToggleAutofill";
import ExtSettings from "./ExtSettings";

/**
 * React component to display extension navbar.
 * @returns navbar jsx
 */
function Navbar() {
  return (
    <>
      <div className="justify-between rounded-2xl items-center flex basis-4/12">
        <OnlineStatus />
        <RetakePhoto />
        <ExtSettings />
      </div>
    </>
  );
}

export default Navbar;
