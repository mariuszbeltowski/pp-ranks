import { playersMock } from "./players-mock";

export const resolvers = {
  Query: {
    players: () => playersMock,
  },
};
