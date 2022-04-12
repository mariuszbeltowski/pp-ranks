import { gql } from "@apollo/client";

export interface PlayerRanking {
  id: string;
  rank: number;
  name: string;
  points: number;
}

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
