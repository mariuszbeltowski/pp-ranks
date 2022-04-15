import { gql, useMutation } from "@apollo/client";
import { RankedPlayer } from "../models/player";
import useAuthContext from "./AuthContext";

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
  const context = useAuthContext();

  return useMutation<AddPlayerData, AddPlayerVariables>(ADD_PLAYER, {
    onError: () => console.log("Add player mutation failed"),
    context,
  });
}
