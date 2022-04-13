import { render } from "@testing-library/react";
import { PlayerRanking } from "../models/player";
import RankingRow from "./RankingRow";

describe("RankingRow", () => {
  it("should display player content", () => {
    const player: PlayerRanking = {
      name: "Testname",
      id: "id1",
      rank: 11,
      points: 900,
    };

    const { getByText } = render(
      <table>
        <tbody>
          <RankingRow player={player} />
        </tbody>
      </table>
    );

    getByText(player.name);
    getByText(player.rank);
    getByText(player.points);
  });
});
