import {
  addPlayer,
  Player,
  rankingMock,
  registerMatchScore,
} from "./ranking-mock";

interface RegisterMatchScoreRequest {
  winningPlayerId: string;
  lostPlayerId: string;
}

interface RegisterMatchScoreResponse {
  winningPlayer: Player;
  lostPlayer: Player;
}

interface AddPlayerRequest {
  name: string;
}

export const resolvers = {
  Query: {
    players: () => rankingMock,
  },
  Mutation: {
    registerMatchScore: (
      _: never,
      { winningPlayerId, lostPlayerId }: RegisterMatchScoreRequest
    ): RegisterMatchScoreResponse =>
      registerMatchScore(winningPlayerId, lostPlayerId),

    addPlayer: (_: never, { name }: AddPlayerRequest): Player =>
      addPlayer(name),
  },
};
