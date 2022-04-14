import { config } from "../config";
import { randomUUID } from "crypto";

export class Player {
  constructor(
    public name: string,
    public points: number = config.playerStartingPoints,
    public _id: string = randomUUID()
  ) {}
}

export const mockPlayersNames = [
  "Darth Vader",
  "Princess Leia",
  "Luke Skywalker",
  "Obi-Wan Kenobi",
  "Boba Fett",
  "Han Solo",
  "Chewbacca",
  "R2-D2",
  "C-3PO",
  "Wilhuff Tarkin",
  "Greedo",
  "Leesub Sirln",
];
