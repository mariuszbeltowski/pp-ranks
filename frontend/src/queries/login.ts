import { gql, useMutation } from "@apollo/client";

interface LoginVariables {
  username: string;
  password: string;
}

export interface LoginData {
  login: string;
}

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export function useLogin() {
  return useMutation<LoginData, LoginVariables>(LOGIN, {
    onError: () => console.log("Add player mutation failed"),
  });
}
