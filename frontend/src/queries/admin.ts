import { gql } from "@apollo/client";
import { PlayerRanking } from "../models/player";

export interface AddPlayerVariables {
  name: string;
}

export interface AddPlayerData {
  addPlayer: PlayerRanking;
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
