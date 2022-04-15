import React, { FormEvent, useEffect, useState } from "react";
import { LoginData, useLogin } from "../queries/Login";
import { FormNotice } from "./FormNotice";
import FormSubmitButton from "./FormSubmitButton";

interface Props {
  setLoginData: (value: LoginData) => void;
}

function LoginForm({ setLoginData }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useLogin();

  useEffect(() => {
    if (data) {
      setLoginData(data);
    }
  }, [data, setLoginData]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0 && !loading) {
      login({ variables: { password, username } });
    }
  };

  return (
    <div className="mx-auto block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-10">
      <form onSubmit={(e) => onFormSubmit(e)}>
        <UsernameInput username={username} setUsername={setUsername} />
        <PasswordInput password={password} setPassword={setPassword} />
        {error && <FormNotice text={error.message} color={"red"} />}
        <FormSubmitButton
          loading={loading}
          text={"Login"}
          label={"login-button"}
          disabled={!username || !password || loading}
        />
      </form>
    </div>
  );
}

interface PasswordInputProps {
  password: string;
  setPassword: (value: string) => void;
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {
  return (
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
  );
}

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
}

function UsernameInput({ username, setUsername }: UsernameInputProps) {
  return (
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
  );
}

export default LoginForm;
