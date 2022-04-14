export const config = {
  eloAlgorithmShiftingFactor: 50,
  playerStartingPoints: 1000,
  mongo: {
    connectionString:
      process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017",
    databaseName: process.env.MONGO_DATABASE_NAME || "myProject",
    playersCollection: process.env.MONGO_PLAYERS_COLLECTION || "players",
  },
};
