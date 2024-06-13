import OnlineStatus from "./OnlineStatus";

function Navbar() {
  return (
    <>
      <div className="rounded-2xl px-2 items-center flex basis-5/12">
        <OnlineStatus />
      </div>
    </>
  );
}

export default Navbar;
