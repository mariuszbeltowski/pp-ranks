import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { PlayerRanking, PLAYERS_RANKING } from "../queries/player-ranking";
import { getMockPlayerRanking } from "../lib/player-mock";
import Ranking from "./Ranking";

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
      data: {},
      error: new Error(errorMessage),
    },
  },
];

describe("Ranking", () => {
  it("should display loading", async () => {
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
    findByText(errorMessage);
  });
});
