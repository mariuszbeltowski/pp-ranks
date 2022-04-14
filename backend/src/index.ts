import { ApolloServer } from "apollo-server";
import { config } from "./config";
import { getResolvers } from "./resolvers";
import { createMongoDatabaseClient } from "./services/mongo";
import { PlayerService } from "./services/player";
import { RankingService } from "./services/ranking";
import { typeDefs } from "./type-defs";

createMongoDatabaseClient().then(
  async ({ client, db }) => {
    const rankingService = new RankingService(
      config.eloAlgorithmShiftingFactor
    );
    const playerService = new PlayerService(client, db, rankingService);

    await playerService.removeAll();
    console.log("All existing players were removed");

    await playerService.populateMockData();
    console.log("Populated players collection with mocked names");

    const resolvers = getResolvers(playerService);

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  },
  (err) => {
    console.error("Failed connect to database with:", err);
  }
);
