import { useMutation } from "@apollo/client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { LOGIN, LoginData, LoginVariables } from "../queries/admin";
import Loader from "./Loader";

interface Props {
  setLoginData: (value: LoginData) => void;
}

function Login({ setLoginData }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation<
    LoginData,
    LoginVariables
  >(LOGIN, { onError: () => console.log("Add player mutation failed") });

  useEffect(() => {
    if (data) {
      setLoginData(data);
    }
  }, [data]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0 && !loading) {
      login({ variables: { password, username } });
    }
  };

  return (
    <div className="mx-auto block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-10">
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-group mb-6">
          <label
            htmlFor="usernameInput"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
              border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="usernameInput"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="passwordInput"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700
            bg-white bg-clip-padding border border-solid border-gray-300 rounded
            transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="passwordInput"
            placeholder="Password"
          />
        </div>
        {error ? (
          <label className="inline-block p-2 text-red-800 motion-safe:fade-up">
            {error.message}
          </label>
        ) : (
          <></>
        )}
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
            rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
            focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-75"
        >
          {loading ? <Loader /> : <span>Sign in</span>}
        </button>
      </form>
    </div>
  );
}

export default Login;
