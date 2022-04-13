import { gql } from "@apollo/client";
import { PlayerRanking } from "../models/player";
export interface PlayersRankingData {
  players: PlayerRanking[];
}

export const PLAYERS_RANKING = gql`
  query GetPlayersRanking {
    players {
      id
      rank
      name
      points
    }
  }
`;
