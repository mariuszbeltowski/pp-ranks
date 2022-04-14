import { RankingService } from "./ranking";

const create = (eloAlgorithmShiftingFactor: number) =>
  new RankingService(eloAlgorithmShiftingFactor);

describe("RankingService", () => {
  it("should make even distributon for players with the same ranking", () => {
    const rankingService = create(10);

    const { winningPlayerPoints, lostPlayerPoints } =
      rankingService.calculatePlayersPoints(100, 100);

    expect(winningPlayerPoints).toBe(105);
    expect(lostPlayerPoints).toBe(95);
  });

  it("should calculate for lostPlayer higher ranking", () => {
    const rankingService = create(10);

    const { winningPlayerPoints, lostPlayerPoints } =
      rankingService.calculatePlayersPoints(95, 105);

    expect(winningPlayerPoints).toBe(100.25);
    expect(lostPlayerPoints).toBe(99.75);
  });

  it("should calculate for winningPlayer higher ranking", () => {
    const rankingService = create(10);

    const { winningPlayerPoints, lostPlayerPoints } =
      rankingService.calculatePlayersPoints(105, 95);

    expect(winningPlayerPoints).toBe(109.75);
    expect(lostPlayerPoints).toBe(90.25);
  });

  it("should calculate for higher shifting factor than ranking", () => {
    const rankingService = create(200);

    const { winningPlayerPoints, lostPlayerPoints } =
      rankingService.calculatePlayersPoints(100, 100);

    expect(winningPlayerPoints).toBe(200);
    expect(lostPlayerPoints).toBe(0);
  });

  it("should calculate for negative ranking", () => {
    const rankingService = create(200);

    const { winningPlayerPoints, lostPlayerPoints } =
      rankingService.calculatePlayersPoints(50, 50);

    expect(winningPlayerPoints).toBe(150);
    expect(lostPlayerPoints).toBe(-50);
  });
});
