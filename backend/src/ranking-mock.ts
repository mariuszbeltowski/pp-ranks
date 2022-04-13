import { ApolloError } from "apollo-server";
import { config } from "./config";
import { randomUUID } from "crypto";
export interface Player {
  id: string;
  rank: number;
  name: string;
  points: number;
}

export const rankingMock: Player[] = [
  {
    id: "id:a",
    rank: 1,
    name: "Darth Vader",
    points: 1000,
  },
  {
    id: "id:b",
    rank: 2,
    name: "Princess Leia",
    points: 1000,
  },
  {
    id: "id:c",
    rank: 3,
    name: "Luke Skywalker",
    points: 1000,
  },
  {
    id: "id:d",
    rank: 4,
    name: "Obi-Wan Kenobi",
    points: 1000,
  },
  {
    id: "id:e",
    rank: 5,
    name: "Boba Fett",
    points: 1000,
  },
  {
    id: "id:f",
    rank: 6,
    name: "Han Solo",
    points: 1000,
  },
  {
    id: "id:g",
    rank: 7,
    name: "Chewbacca",
    points: 1000,
  },
  {
    id: "id:h",
    rank: 8,
    name: "R2-D2",
    points: 1000,
  },
  {
    id: "id:i",
    rank: 9,
    name: "C-3PO",
    points: 1000,
  },
  {
    id: "id:j",
    rank: 10,
    name: "Wilhuff Tarkin",
    points: 1000,
  },
  {
    id: "id:k",
    rank: 11,
    name: "Greedo",
    points: 1000,
  },
  {
    id: "id:o",
    rank: 12,
    name: "Leesub Sirln",
    points: 1000,
  },
];

export function addPlayer(name: string) {
  if (rankingMock.find((player) => player.name === name)) {
    throw new ApolloError(
      `Player with name "${name}" already exists`,
      "PLAYER_NAME_ALREADY_EXISTS"
    );
  }

  const newPlayer: Player = {
    id: randomUUID(),
    rank: rankingMock.length + 1,
    name,
    points: config.playerStartingPoints,
  };
  rankingMock.push(newPlayer);

  return newPlayer;
}

export function registerMatchScore(
  winningPlayerId: string,
  lostPlayerId: string
) {
  const winningPlayer = rankingMock.find(
    (player) => player.id === winningPlayerId
  );

  if (!winningPlayer) {
    throw new ApolloError(
      "Winning player not found",
      "WINNING_PLAYER_NOT_FOUND"
    );
  }

  const lostPlayer = rankingMock.find((player) => player.id === lostPlayerId);

  if (!lostPlayer) {
    throw new ApolloError("Lost player not found", "LOST_PLAYER_NOT_FOUND");
  }

  const winningPlayerWinProbability =
    winningPlayer.points / (winningPlayer.points + lostPlayer.points);

  const lostPlayerWinProbability =
    lostPlayer.points / (winningPlayer.points + lostPlayer.points);

  winningPlayer.points +=
    config.eloAlgorithmShiftingFactor * (1 - winningPlayerWinProbability);
  lostPlayer.points +=
    config.eloAlgorithmShiftingFactor * (0 - lostPlayerWinProbability);

  return {
    winningPlayer,
    lostPlayer,
  };
}
