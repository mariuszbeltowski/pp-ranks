import { RankedPlayer } from "../models/player";
import { PLAYERS_RANKING } from "../queries/player-ranking";

export const mockedPlayers: RankedPlayer[] = [
  getMockPlayerRanking("1", "player1"),
  getMockPlayerRanking("2", "player2"),
  getMockPlayerRanking("3", "player3"),
];

export const mockedPlayersData = {
  request: {
    query: PLAYERS_RANKING,
    variables: {},
  },
  result: {
    data: {
      rankedPlayers: mockedPlayers,
    },
  },
};

export function getMockPlayerRanking(id: string, name: string): RankedPlayer {
  return {
    id,
    name,
    rank: 11,
    points: 22,
  };
}
