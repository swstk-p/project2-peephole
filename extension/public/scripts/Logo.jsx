// import peephole.png from '../images'

function Logo() {
  return (
    <>
      <div className="flex bg-violet-300 rounded-2xl px-1 items-start w-fit h-fit space-x-0">
        <div className="p-1 rounded-full">
          <img className="w-8 rounded-full" src="../images/peephole.jpg"></img>
        </div>
        <div className="p-1">
          <span className="text-2xl font-bold">peep 'ole</span>
        </div>
      </div>
    </>
  );
}

export default Logo;
