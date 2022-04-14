import { ApolloServer } from "apollo-server";
import { config } from "./config";
import { Player } from "./models/player";
import { PlayerRepository } from "./repositories/player.repository";
import { getResolvers } from "./resolvers";
import { createMongoDatabaseClient } from "./utils/mongo";
import { PlayerService } from "./services/player.service";
import { RankingService } from "./services/ranking.service";
import { typeDefs } from "./type-defs";

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

    // Prepare the DB
    await playerService.removeAll();
    console.log("All existing players were removed");

    await playerService.populateMockData();
    console.log("Populated players collection with mocked names");

    // Setup API
    const resolvers = getResolvers(playerService);

    const server = new ApolloServer({ typeDefs, resolvers });

    // Start the server
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  },
  (err) => {
    console.error("Failed connect to database with:", err);
  }
);
