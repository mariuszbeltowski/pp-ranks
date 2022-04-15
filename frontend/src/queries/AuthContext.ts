import React, { useContext } from "react";
import { LoginDataContext } from "../contexts/LoginData";

export default function useAuthContext() {
  const userContext = useContext(LoginDataContext);

  return {
    headers: {
      Authorization: userContext ? `Bearer ${userContext.login}` : "",
    },
  };
}
