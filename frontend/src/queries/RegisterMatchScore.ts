import { gql, useMutation } from "@apollo/client";
import { RankedPlayer } from "../models/player";
import useAuthContext from "./AuthContext";

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
  const context = useAuthContext();

  return useMutation<RegisterMatchScoreData, RegisterMatchScoreVariables>(
    REGISTER_MATCH_SCORE,
    {
      onError: () => console.log("Register match score mutation failed"),
      context,
    }
  );
}
