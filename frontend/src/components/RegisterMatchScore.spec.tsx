import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockedPlayers, mockedPlayersData } from "../lib/player-mock";
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

const setup = (mocks?: ReadonlyArray<MockedResponse>) => {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RegisterMatchForm />
    </MockedProvider>
  );

  const { getByLabelText } = utils;
  const winningSelect = getByLabelText("winning-select") as HTMLSelectElement;
  const lostSelect = getByLabelText("lost-select") as HTMLSelectElement;
  const button = getByLabelText("register-button") as HTMLButtonElement;

  const setWinningSelect = async (name: string) =>
    userEvent.selectOptions(
      winningSelect,
      (await utils.findAllByRole("option", { name }))[0]
    );

  const setLostSelect = async (name: string) =>
    userEvent.selectOptions(
      lostSelect,
      (await utils.findAllByRole("option", { name }))[1]
    );

  return {
    winningSelect,
    lostSelect,
    setWinningSelect,
    setLostSelect,
    button,
    ...utils,
  };
};

describe("AddPlayerForm", () => {
  it("should render", () => {
    const { getByText } = setup();
    getByText("Register match score");
  });

  it("select changes should update select values", async () => {
    const { winningSelect, lostSelect, setWinningSelect, setLostSelect } =
      setup([mockedPlayersData]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);

    expect(winningSelect.value).toBe(winningPlayer.id);
    expect(lostSelect.value).toBe(lostPlayer.id);
  });

  it("should clear selects after submit", async () => {
    const {
      winningSelect,
      lostSelect,
      setWinningSelect,
      setLostSelect,
      button,
    } = setup([mockedPlayersData, mockedRegisterMatchScoreMutationData]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(button);

    expect(winningSelect.value).toBe("none");
    expect(lostSelect.value).toBe("none");
  });

  it("should show loader after submit", async () => {
    const { setWinningSelect, setLostSelect, button, getByLabelText } = setup([
      mockedPlayersData,
      mockedRegisterMatchScoreMutationData,
    ]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(button);

    getByLabelText("loader-indicator");
  });

  it("should show usernames after successful submit", async () => {
    const { setWinningSelect, setLostSelect, button, findByText } = setup([
      mockedPlayersData,
      mockedRegisterMatchScoreMutationData,
    ]);

    await setWinningSelect(winningPlayer.name);
    await setLostSelect(lostPlayer.name);
    userEvent.click(button);

    await findByText(new RegExp(`"${winningPlayer.name}"`));
    await findByText(new RegExp(`"${lostPlayer.name}"`));
  });
});
