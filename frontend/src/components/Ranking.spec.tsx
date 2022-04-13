import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { PLAYERS_RANKING } from "../queries/player-ranking";
import { mockedPlayers, mockedPlayersData } from "../lib/player-mock";
import Ranking from "./Ranking";
import { GraphQLError } from "graphql";

const errorMessage = "An error occurred";
const mockedErrorData = {
  request: {
    query: PLAYERS_RANKING,
    variables: {},
  },
  result: {
    errors: [new GraphQLError(errorMessage)],
  },
};

const create = (mocks?: ReadonlyArray<MockedResponse>) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Ranking />
    </MockedProvider>
  );
};

describe("Ranking", () => {
  it("should display loading", () => {
    const { getByText } = create();
    getByText("Loading...");
  });

  it("should display RankingRows", async () => {
    const { findAllByText } = create([mockedPlayersData]);

    await findAllByText(mockedPlayers[0].name);
    await findAllByText(mockedPlayers[1].name);
    await findAllByText(mockedPlayers[2].name);
  });

  it("should display error", async () => {
    const { findByText } = create([mockedErrorData]);
    await findByText(errorMessage);
  });
});
