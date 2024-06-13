function OnlineStatus() {
  return (
    <>
      <div className="p-1 h-fit flex items-center space-x-1">
        <div className="rounded-full flex justify-center items-center w-2 h-2 bg-lime-600"></div>
        <span className="text-xs font-semibold">Online</span>
      </div>
    </>
  );
}

export default OnlineStatus;
