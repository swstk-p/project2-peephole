import { useState } from "react";
import Header from "./Header";
import MainBody from "./MainBody";

function App() {
  return (
    <>
      <div className="mb-5">
        <Header />
      </div>
      <div className="mt-5">
        <MainBody />
      </div>
    </>
  );
}

export default App;
