import { ApolloError } from "apollo-server";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { config } from "../config";

import { Player, mockPlayersNames } from "../models/player";
import { RankedPlayer } from "../models/ranked-player";
import { RankingService } from "./ranking";

export class PlayerService {
  collection: Collection<Player>;

  constructor(
    private dbClient: MongoClient,
    private db: Db,
    private rankingService: RankingService
  ) {
    this.collection = db.collection<Player>(config.mongo.playersCollection);
  }

  async addPlayer(name: string) {
    const existingPlayer = await this.collection.findOne({ name });

    if (existingPlayer) {
      throw new ApolloError(
        `Player with name "${name}" already exists`,
        "PLAYER_NAME_ALREADY_EXISTS"
      );
    }

    const newPlayer = new Player(name);
    const inserted = await this.collection.insertOne(newPlayer);

    return (await this.getRankedPlayer(inserted.insertedId))!;
  }

  async registerMatchScore(winningPlayerId: string, lostPlayerId: string) {
    if (winningPlayerId === lostPlayerId) {
      throw new ApolloError("Provided players are the same", "SAME_PLAYERS");
    }

    const winningPlayer = await this.collection.findOne({
      _id: winningPlayerId,
    });

    if (!winningPlayer) {
      throw new ApolloError(
        "Winning player not found",
        "WINNING_PLAYER_NOT_FOUND"
      );
    }

    const lostPlayer = await this.collection.findOne({
      _id: lostPlayerId,
    });

    if (!lostPlayer) {
      throw new ApolloError("Lost player not found", "LOST_PLAYER_NOT_FOUND");
    }

    const { winningPlayerPoints, lostPlayerPoints } =
      this.rankingService.calculatePlayersPoints(
        winningPlayer.points,
        lostPlayer.points
      );

    await this.collection.updateOne(
      { _id: winningPlayerId },
      { $set: { points: winningPlayerPoints } }
    );

    await this.collection.updateOne(
      { _id: lostPlayerId },
      { $set: { points: lostPlayerPoints } }
    );

    return {
      lostPlayer: (await this.getRankedPlayer(lostPlayerId))!,
      winningPlayer: (await this.getRankedPlayer(winningPlayerId))!,
    };
  }

  async getRankedPlayers() {
    const players = await this.collection
      .aggregate<Player>([
        {
          $sort: { points: -1 },
        },
      ])
      .toArray();

    return players.map((player, index) => RankedPlayer.from(player, index + 1));
  }

  async getRankedPlayer(id: string) {
    const rankedPlayers = await this.getRankedPlayers();
    return rankedPlayers.filter((player) => player.id === id).at(0);
  }

  async removeAll() {
    return this.collection.deleteMany({});
  }

  async populateMockData() {
    const mockPlayers = mockPlayersNames.map((name) => new Player(name));

    return this.collection.insertMany(mockPlayers);
  }
}
