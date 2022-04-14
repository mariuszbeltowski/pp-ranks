import { GraphQLError } from "graphql";
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

export const errorMessage = "An error occurred";
export const mockedPlayersErrorData = {
  request: {
    query: PLAYERS_RANKING,
    variables: {},
  },
  result: {
    errors: [new GraphQLError(errorMessage)],
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
