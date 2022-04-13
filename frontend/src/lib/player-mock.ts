import { PlayerRanking } from "../queries/player-ranking";

export function getMockPlayerRanking(id: string, name: string): PlayerRanking {
  return {
    id,
    name,
    rank: 11,
    points: 22,
  };
}
