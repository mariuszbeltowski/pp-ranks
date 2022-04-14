import { Player } from "./player";

export class RankedPlayer {
  constructor(
    public id: string,
    public name: string,
    public points: number,
    public rank: number
  ) {}

  static from(player: Player, rank: number) {
    const { name, points, _id } = player;
    return new RankedPlayer(_id, name, Math.floor(points), rank);
  }
}
