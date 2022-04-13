import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getMockPlayerRanking } from "../lib/player-mock";
import AddPlayerForm from "./AddPlayerForm";
import { ADD_PLAYER } from "../queries/admin";
import userEvent from "@testing-library/user-event";

const playerName = "player1";
const mockedPlayer = getMockPlayerRanking("1", playerName);

const mockedCreatePlayerMutationData: MockedResponse = {
  request: {
    query: ADD_PLAYER,
    variables: { name: playerName },
  },
  result: {
    data: {
      addPlayer: mockedPlayer,
    },
  },
};

const errorMessage = "An error occurred";
const mockedErrorData = [
  {
    request: {
      query: ADD_PLAYER,
      variables: {},
    },
    result: {
      data: {},
      error: new Error(errorMessage),
    },
  },
];

const setup = (mocks?: ReadonlyArray<MockedResponse>) => {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AddPlayerForm />
    </MockedProvider>
  );

  const { getByLabelText } = utils;
  const input = getByLabelText("name-input") as HTMLInputElement;
  const button = getByLabelText("create-button") as HTMLButtonElement;

  return {
    input,
    button,
    ...utils,
  };
};

describe("AddPlayerForm", () => {
  it("should render", () => {
    const { getByText } = setup();
    getByText("Add new player");
  });

  it("input change should update value", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: playerName } });

    expect(input.value).toBe(playerName);
  });

  it("should clear input after submit", async () => {
    const { input, button } = setup([mockedCreatePlayerMutationData]);

    fireEvent.change(input, { target: { value: playerName } });
    userEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("should show loader after submit", () => {
    const { input, button, getByLabelText } = setup([
      mockedCreatePlayerMutationData,
    ]);

    fireEvent.change(input, { target: { value: playerName } });
    userEvent.click(button);

    getByLabelText("loader-indicator");
  });

  it("should show username after successful submit", async () => {
    const { input, button, findByText } = setup([
      mockedCreatePlayerMutationData,
    ]);

    fireEvent.change(input, { target: { value: playerName } });
    userEvent.click(button);

    await findByText(new RegExp(playerName));
  });
});
