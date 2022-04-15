import React, { useState } from "react";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import RegisterMatchForm from "../components/RegisterMatchForm";
import { LoginDataProvider } from "../contexts/LoginData";
import { LoginData } from "../queries/Login";

function Admin() {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-md text-center">
        <h2 className="my-10 font-bold">Admin panel</h2>
        <LoginDataProvider value={loginData}>
          {loginData ? (
            <div>
              <RegisterMatchForm />
              <AddPlayerForm />
            </div>
          ) : (
            <LoginForm setLoginData={setLoginData} />
          )}
        </LoginDataProvider>
      </div>
    </div>
  );
}

export default Admin;
