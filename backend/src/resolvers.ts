import { GraphQLError } from "graphql";
import { RankedPlayer } from "./models/ranked-player";
import { User } from "./models/user";
import { PlayerService } from "./services/player.service";
import { UserService } from "./services/user.service";

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

interface LoginRequest {
  username: string;
  password: string;
}

interface UserContext {
  user: User;
}

export function getResolvers(
  playerService: PlayerService,
  userService: UserService
) {
  return {
    Query: {
      rankedPlayers: async () => playerService.getRankedPlayers(),
    },
    Mutation: {
      registerMatchScore: async (
        _: never,
        { winningPlayerId, lostPlayerId }: RegisterMatchScoreRequest,
        context: UserContext
      ): Promise<RegisterMatchScoreResponse> => {
        if (context.user) {
          return playerService.registerMatchScore(
            winningPlayerId,
            lostPlayerId
          );
        } else {
          throw new GraphQLError("Unauthorized");
        }
      },

      addPlayer: async (
        _: never,
        { name }: AddPlayerRequest,
        context: UserContext
      ): Promise<RankedPlayer> => {
        if (context.user) {
          return playerService.addPlayer(name);
        } else {
          throw new GraphQLError("Unauthorized");
        }
      },

      login: async (_parent: never, { username, password }: LoginRequest) =>
        userService.login(username, password),
    },
  };
}
