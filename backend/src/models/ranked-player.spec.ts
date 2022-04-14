import { Player } from "./player";
import { RankedPlayer } from "./ranked-player";

describe("RankedPlayer", () => {
  it("should create ranked player from Player", () => {
    const player = new Player("Player1", 100, "id");
    const rank = 10;

    const rankedPlayer = RankedPlayer.from(player, rank);
  });
});
