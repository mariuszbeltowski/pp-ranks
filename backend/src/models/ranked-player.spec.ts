import { getMockedPlayer } from "../utils/player-mocks";
import { Player } from "./player";
import { RankedPlayer } from "./ranked-player";

describe("RankedPlayer", () => {
  it("should create ranked player from Player", () => {
    const player = getMockedPlayer({});

    const rank = 10;
    const rankedPlayer = RankedPlayer.from(player, rank);

    expect(rankedPlayer.id).toBe(player._id);
    expect(rankedPlayer.name).toBe(player.name);
    expect(rankedPlayer.points).toBe(player.points);
    expect(rankedPlayer.rank).toBe(rank);
  });

  it("should roound the points", () => {
    const points = 999.99;
    const player = getMockedPlayer({ points });

    const rank = 10;
    const rankedPlayer = RankedPlayer.from(player, rank);

    expect(rankedPlayer.points).toBe(999);
  });
});
