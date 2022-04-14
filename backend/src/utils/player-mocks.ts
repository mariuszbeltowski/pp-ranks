import { Player } from "../models/player";

const mockName = "Player1";
const mockPoints = 100;
const mockId = "id:player1";

export const getMockedPlayer = ({
  name = mockName,
  points = mockPoints,
  id = mockId,
}) => new Player(name, points, id);
