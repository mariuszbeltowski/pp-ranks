import { MongoClient } from "mongodb";
import { config } from "../config";

export async function createMongoDatabaseClient() {
  const { mongo } = config;
  const client = new MongoClient(mongo.connectionString);

  console.log("Connecting to mongo database server...");
  await client.connect();
  console.log("Connected successfully to mongo database server");
  const db = client.db(mongo.databaseName);

  return { client, db };
}
