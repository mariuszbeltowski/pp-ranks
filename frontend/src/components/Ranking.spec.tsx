import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import {
  errorMessage,
  mockedPlayersErrorData,
  mockedPlayers,
  mockedPlayersData,
} from "../lib/player-mock";
import Ranking from "./Ranking";

const setup = (mocks?: ReadonlyArray<MockedResponse>) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Ranking />
    </MockedProvider>
  );
};

describe("Ranking", () => {
  it("should display loading", () => {
    const { getByText } = setup();
    getByText("Loading...");
  });

  it("should display RankingRows", async () => {
    const { findAllByText } = setup([mockedPlayersData]);

    await findAllByText(mockedPlayers[0].name);
    await findAllByText(mockedPlayers[1].name);
    await findAllByText(mockedPlayers[2].name);
  });

  it("should display error", async () => {
    const { findByText } = setup([mockedPlayersErrorData]);
    await findByText(errorMessage);
  });
});
