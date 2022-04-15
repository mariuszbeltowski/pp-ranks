import { createContext, PropsWithChildren } from "react";
import { LoginData } from "../queries/login";

export const LoginDataContext = createContext<LoginData | null>(null);
interface ILoginDataProvider {
  value: LoginData | null;
}

export function LoginDataProvider({
  children,
  value,
}: PropsWithChildren<ILoginDataProvider>) {
  return (
    <LoginDataContext.Provider value={value}>
      {children}
    </LoginDataContext.Provider>
  );
}
