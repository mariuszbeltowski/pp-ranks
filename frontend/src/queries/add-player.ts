import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { LoginDataContext } from "../contexts/LoginData";
import { RankedPlayer } from "../models/player";

export interface AddPlayerVariables {
  name: string;
}

export interface AddPlayerData {
  addPlayer: RankedPlayer;
}

export const ADD_PLAYER = gql`
  mutation AddPlayer($name: String!) {
    addPlayer(name: $name) {
      id
      rank
      name
      points
    }
  }
`;

export function useAddPlayer() {
  const userContext = useContext(LoginDataContext);

  return useMutation<AddPlayerData, AddPlayerVariables>(ADD_PLAYER, {
    onError: () => console.log("Add player mutation failed"),
    context: {
      headers: {
        Authorization: userContext ? `Bearer ${userContext.login}` : "",
      },
    },
  });
}
