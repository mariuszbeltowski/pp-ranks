import { gql } from "@apollo/client";
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

export interface RegisterMatchScoreVariables {
  winningPlayerId: string;
  lostPlayerId: string;
}

interface RegisterMatchScore {
  winningPlayer: RankedPlayer;
  lostPlayer: RankedPlayer;
}
export interface RegisterMatchScoreData {
  registerMatchScore: RegisterMatchScore;
}

export const REGISTER_MATCH_SCORE = gql`
  mutation RegisterMatchScore($winningPlayerId: ID!, $lostPlayerId: ID!) {
    registerMatchScore(
      winningPlayerId: $winningPlayerId
      lostPlayerId: $lostPlayerId
    ) {
      winningPlayer {
        id
        rank
        name
        points
      }
      lostPlayer {
        id
        rank
        name
        points
      }
    }
  }
`;
