import { useState } from "react";
import Header from "./Header";
import MainBody from "./MainBody";

function App() {
  return (
    <>
      <div className="mb-3">
        <Header />
      </div>
      <div className="mt-3">
        <MainBody />
      </div>
    </>
  );
}

export default App;
