import React from "react";
import Header from "../components/Header";

function NotFound() {
  return (
    <div>
      <Header />
      <div className="mx-auto text-center max-w-md">
        <h2>Requested website was not found</h2>
      </div>
    </div>
  );
}

export default NotFound;
