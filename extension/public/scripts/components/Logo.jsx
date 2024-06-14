function Logo() {
  return (
    <>
      <div className="flex rounded-2xl items-start w-fit h-fit">
        <div className="p-1 rounded-full">
          <img
            className="w-8 object-cover rounded-full"
            src="../images/peephole.jpg"></img>
        </div>
        <div className="p-1">
          <span className="text-xl font-extrabold"> peep 'ole</span>
        </div>
      </div>
    </>
  );
}

export default Logo;
