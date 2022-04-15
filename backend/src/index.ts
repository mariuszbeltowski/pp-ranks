import { ApolloServer } from "apollo-server";
import { config } from "./config";
import { Player } from "./models/player";
import { PlayerRepository } from "./repositories/player.repository";
import { getResolvers } from "./resolvers";
import { createMongoDatabaseClient } from "./utils/mongo";
import { PlayerService } from "./services/player.service";
import { RankingService } from "./services/ranking.service";
import { typeDefs } from "./type-defs";
import { UserService } from "./services/user.service";
import { getContext } from "./context";

createMongoDatabaseClient().then(
  async ({ client, db }) => {
    // Basic DI
    const rankingService = new RankingService(
      config.eloAlgorithmShiftingFactor
    );
    const playerCollection = db.collection<Player>(
      config.mongo.playersCollection
    );

    const playerRepository = new PlayerRepository(client, playerCollection);
    const playerService = new PlayerService(playerRepository, rankingService);
    const userService = new UserService();

    // Prepare the DB
    await playerService.removeAll();
    console.log("All existing players were removed");

    await playerService.populateMockData();
    console.log("Populated players collection with mocked names");

    // Setup API
    const resolvers = getResolvers(playerService, userService);
    const context = getContext(userService);

    const server = new ApolloServer({ typeDefs, resolvers, context });

    // Start the server
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  },
  (err) => {
    console.error("Failed connect to database with:", err);
  }
);
