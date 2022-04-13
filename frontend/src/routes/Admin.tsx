import React from "react";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import RegisterMatchForm from "../components/RegisterMatchForm";

function Admin() {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md text-center">
        <h2 className="my-10 font-bold">Admin panel</h2>
        <RegisterMatchForm />
        <AddPlayerForm />
      </div>
    </div>
  );
}

export default Admin;
