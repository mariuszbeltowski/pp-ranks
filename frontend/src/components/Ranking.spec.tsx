import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { PLAYERS_RANKING } from "../queries/player-ranking";
import { PlayerRanking } from "../models/player";
import { getMockPlayerRanking } from "../lib/player-mock";
import Ranking from "./Ranking";
import { GraphQLError } from "graphql";

const players: PlayerRanking[] = [
  getMockPlayerRanking("1", "player1"),
  getMockPlayerRanking("2", "player2"),
  getMockPlayerRanking("3", "player3"),
];

const mockedPlayersData = [
  {
    request: {
      query: PLAYERS_RANKING,
      variables: {},
    },
    result: {
      data: {
        players,
      },
    },
  },
];

const errorMessage = "An error occurred";
const mockedErrorData = [
  {
    request: {
      query: PLAYERS_RANKING,
      variables: {},
    },
    result: {
      errors: [new GraphQLError(errorMessage)],
    },
  },
];

describe("Ranking", () => {
  it("should display loading", () => {
    const { getByText } = render(
      <MockedProvider>
        <Ranking />
      </MockedProvider>
    );
    getByText("Loading...");
  });

  it("should display RankingRows", async () => {
    const { findAllByText } = render(
      <MockedProvider mocks={mockedPlayersData} addTypename={false}>
        <Ranking />
      </MockedProvider>
    );

    await findAllByText(players[0].name);
    await findAllByText(players[1].name);
    await findAllByText(players[2].name);
  });

  it("should display error", async () => {
    const { findByText } = render(
      <MockedProvider mocks={mockedErrorData}>
        <Ranking />
      </MockedProvider>
    );
    await findByText(errorMessage);
  });
});
