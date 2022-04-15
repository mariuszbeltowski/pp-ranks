import { gql, useQuery } from "@apollo/client";
import { config } from "../config";
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

export function useRanking() {
  return useQuery<PlayersRankingData>(PLAYERS_RANKING, {
    pollInterval: config.rankingPoolIntervalMs,
  });
}
