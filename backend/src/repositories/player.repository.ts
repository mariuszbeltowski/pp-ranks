import { ApolloError } from "apollo-server";
import { Collection, InsertOneResult, MongoClient } from "mongodb";
import { Player } from "../models/player";

export class PlayerRepository {
  constructor(
    private dbClient: MongoClient,
    private collection: Collection<Player>
  ) {}

  async updatePlayerPoints(_id: string, points: number) {
    return this.collection.updateOne({ _id }, { $set: { points } });
  }

  async addPlayer(player: Player): Promise<InsertOneResult<Player>> {
    const { name } = player;
    const dbSession = this.dbClient.startSession();
    try {
      dbSession.startTransaction();
      const existingPlayer = await this.collection.findOne({ name });
      if (existingPlayer) {
        throw new ApolloError(
          `Player with name "${name}" already exists`,
          "PLAYER_NAME_ALREADY_EXISTS"
        );
      }

      const inserted = await this.collection.insertOne(player);
      await dbSession.commitTransaction();
      return inserted;
    } catch (e) {
      await dbSession.abortTransaction();
      throw e;
    } finally {
      await dbSession.endSession();
    }
  }

  async addPlayers(players: Player[]) {
    return this.collection.insertMany(players);
  }

  async purge() {
    return this.collection.deleteMany({});
  }

  async getPlayersOrderedByPointsDesc(): Promise<Player[]> {
    return this.collection
      .aggregate<Player>([
        {
          $sort: { points: -1 },
        },
      ])
      .toArray();
  }

  async updatePlayers(
    playerIds: string[],
    fn: (players: Player[]) => Player[]
  ) {
    const session = this.dbClient.startSession();
    session.startTransaction();
    try {
      const players = await this.collection
        .find({
          _id: {
            $in: playerIds,
          },
        })
        .toArray();

      const modifiedPlayers = fn(players);

      const updates = modifiedPlayers.map((player) =>
        this.collection.updateOne({ _id: player._id }, { $set: player })
      );

      await Promise.all(updates);

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
