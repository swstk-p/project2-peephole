import { useState } from "react";
import Header from "./Header";
import MainBody from "./MainBody";

/**
 * React component to render application.
 * @returns app jsx component
 */
function App() {
  return (
    <>
      <div>
        <div className="mt-3 mb-5">
          <Header />
        </div>
        <div className="mt-5">
          <MainBody />
        </div>
      </div>
    </>
  );
}

export default App;
