jest.mock("./ranking");
jest.mock("mongodb");

import { Collection, MongoClient } from "mongodb";
import { Player } from "../models/player";
import { PlayerService } from "./player";
import { RankingService } from "./ranking";

const rankingServiceMock = new RankingService(
  10
) as jest.Mocked<RankingService>;

const mongoClientMock = new MongoClient("") as jest.Mocked<MongoClient>;
const collection = new Collection<Player>() as jest.Mocked<Collection<Player>>;

const create = () => new PlayerService({} as any, rankingServiceMock);

describe("PlayerService", () => {
  beforeEach(() => {
    rankingServiceMock.calculatePlayersPoints.mockClear();
  });

  it("should add player", async () => {
    const playerService = create();
    collection.findOne.mockImplementationOnce(() => Promise.resolve(null));

    collection.insertOne.mockImplementationOnce(() =>
      Promise.resolve({
        insertedId: "player1",
      })
    );

    // collection.aggregate.mockImplementationOnce(() => ({ toArray: () => {} }));

    const player = await playerService.addPlayer("name");
  });
});
