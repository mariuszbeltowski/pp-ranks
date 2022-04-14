import { gql } from "@apollo/client";
import { RankedPlayer } from "../models/player";
export interface PlayersRankingData {
  rankedPlayers: RankedPlayer[];
}

export const PLAYERS_RANKING = gql`
  query GetPlayersRanking {
    rankedPlayers {
      id
      rank
      name
      points
    }
  }
`;
