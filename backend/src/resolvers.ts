import { RankedPlayer } from "./models/ranked-player";
import { PlayerService } from "./services/player";

interface RegisterMatchScoreRequest {
  winningPlayerId: string;
  lostPlayerId: string;
}

interface RegisterMatchScoreResponse {
  winningPlayer: RankedPlayer;
  lostPlayer: RankedPlayer;
}

interface AddPlayerRequest {
  name: string;
}

export function getResolvers(playerService: PlayerService) {
  return {
    Query: {
      rankedPlayers: async () => playerService.getRankedPlayers(),
    },
    Mutation: {
      registerMatchScore: async (
        _: never,
        { winningPlayerId, lostPlayerId }: RegisterMatchScoreRequest
      ): Promise<RegisterMatchScoreResponse> =>
        playerService.registerMatchScore(winningPlayerId, lostPlayerId),

      addPlayer: async (
        _: never,
        { name }: AddPlayerRequest
      ): Promise<RankedPlayer> => playerService.addPlayer(name),
    },
  };
}
