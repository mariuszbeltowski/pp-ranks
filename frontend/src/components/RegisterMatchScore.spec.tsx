import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";
import {
  errorMessage,
  mockedPlayers,
  mockedPlayersData,
  mockedPlayersErrorData,
} from "../lib/player-mock";
import { REGISTER_MATCH_SCORE } from "../queries/admin";
import RegisterMatchForm from "./RegisterMatchForm";

const winningPlayer = mockedPlayers[0];
const winningPlayerId = winningPlayer.id;

const lostPlayer = mockedPlayers[1];
const lostPlayerId = lostPlayer.id;

const mockedRegisterMatchScoreMutationData: MockedResponse = {
  request: {
    query: REGISTER_MATCH_SCORE,
    variables: { winningPlayerId, lostPlayerId },
  },
  result: {
    data: {
      registerMatchScore: {
        winningPlayer,
        lostPlayer,
      },
    },
  },
};

const mockedRegisterMatchScoreMutationErrorData: MockedResponse = {
  request: {
    query: REGISTER_MATCH_SCORE,
    variables: { winningPlayerId, lostPlayerId },
  },
  result: {
    errors: [new GraphQLError(errorMessage)],
  },
};

const setup = (mocks?: ReadonlyArray<MockedResponse>) => {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RegisterMatchForm />
    </MockedProvider>
  );

  const { findByLabelText } = utils;
  const findWinningSelect = () =>
    findByLabelText("winning-select") as Promise<HTMLSelectElement>;
  const findLostSelect = () =>
    findByLabelText("lost-select") as Promise<HTMLSelectElement>;
  const findButton = () =>
    findByLabelText("register-button") as Promise<HTMLButtonElement>;

  const setWinningSelect = async (name: string) =>
    userEvent.selectOptions(
      await findWinningSelect(),
      (await utils.findAllByRole("option", { name }))[0]
    );

  const setLostSelect = async (name: string) =>
    userEvent.selectOptions(
      await findLostSelect(),
      (await utils.findAllByRole("option", { name }))[1]
    );

  return {
    findWinningSelect,
    findLostSelect,
    setWinningSelect,
    setLostSelect,
    findButton,
    ...utils,
  };
};

describe("AddPlayerForm", () => {
  it("should render", async () => {
    const { findByText } = setup([mockedPlayersData]);
    await findByText("Register match score");
  });

  it("should display loading", async () => {
    const { getByText } = setup();
    getByText("Loading...");
  });

  it("select changes should update select values", async () => {
    const {
      findWinningSelect,
      findLostSelect,
      setWinningSelect,
      setLostSelect,
    } = setup([mockedPlayersData, mockedPlayersData]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);

    const lostSelect = await findLostSelect();
    const winningSelect = await findWinningSelect();

    expect(winningSelect.value).toBe(winningPlayer.id);
    expect(lostSelect.value).toBe(lostPlayer.id);
  });

  it("should clear selects after submit", async () => {
    const {
      findWinningSelect,
      findLostSelect,
      setWinningSelect,
      setLostSelect,
      findButton,
    } = setup([mockedPlayersData, mockedRegisterMatchScoreMutationData]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(await findButton());

    const lostSelect = await findLostSelect();
    const winningSelect = await findWinningSelect();

    expect(winningSelect.value).toBe("none");
    expect(lostSelect.value).toBe("none");
  });

  it("should show loader after submit", async () => {
    const { setWinningSelect, setLostSelect, findButton, getByLabelText } =
      setup([mockedPlayersData, mockedRegisterMatchScoreMutationData]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(await findButton());

    getByLabelText("loader-indicator");
  });

  it("should show usernames after successful submit", async () => {
    const { setWinningSelect, setLostSelect, findButton, findByText } = setup([
      mockedPlayersData,
      mockedRegisterMatchScoreMutationData,
    ]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(await findButton());

    await findByText(new RegExp(`"${winningPlayer.name}"`));
    await findByText(new RegExp(`"${lostPlayer.name}"`));
  });

  it("should show error if players query fail", async () => {
    const { findByText } = setup([mockedPlayersErrorData]);

    await findByText(errorMessage);
  });

  it("should show error if register match score mutation fail", async () => {
    const { setWinningSelect, setLostSelect, findButton, findByText } = setup([
      mockedPlayersData,
      mockedRegisterMatchScoreMutationErrorData,
    ]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(await findButton());

    await findByText(errorMessage);
  });
});
