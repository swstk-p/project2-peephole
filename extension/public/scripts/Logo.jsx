// import peephole.png from '../images'

function Logo() {
  return (
    <>
      <div className="flex rounded-2xl px-1 w-fit h-fit space-x-0">
        <div className="p-1 rounded-full">
          <img className="w-8 rounded-full" src="../images/peephole.jpg"></img>
        </div>
        <div className="p-1">
          <h1 className="text-2xl font-bold">peep 'ole</h1>
        </div>
      </div>
    </>
  );
}

export default Logo;
