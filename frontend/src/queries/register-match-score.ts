import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { LoginDataContext } from "../contexts/LoginData";
import { RankedPlayer } from "../models/player";

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

export function useRegisterMatchScore() {
  const userContext = useContext(LoginDataContext);

  return useMutation<RegisterMatchScoreData, RegisterMatchScoreVariables>(
    REGISTER_MATCH_SCORE,
    {
      onError: () => console.log("Register match score mutation failed"),
      context: {
        headers: {
          Authorization: userContext ? `Bearer ${userContext.login}` : "",
        },
      },
    }
  );
}
