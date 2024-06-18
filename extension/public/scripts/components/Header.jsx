import Logo from "./Logo";
import Navbar from "./Navbar";

function Header() {
  return (
    <>
      <div className="`rounded-lg flex p-1 w-full justify-between">
        <Logo />
        <Navbar />
      </div>{" "}
    </>
  );
}

export default Header;
