import Logo from "./Logo";
import Navbar from "./Navbar";

/**
 * React component to display the extension header.
 * @returns jsx to display header components
 */
function Header() {
  return (
    <>
      <div className="px-5 rounded-lg flex py-1 w-full justify-between">
        <Logo />
        <Navbar />
      </div>{" "}
    </>
  );
}

export default Header;
