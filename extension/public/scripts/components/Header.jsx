import Logo from "./Logo";
import Navbar from "./Navbar";

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
