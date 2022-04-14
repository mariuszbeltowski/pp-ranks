export class RankingService {
  constructor(private eloAlgorithmShiftingFactor: number) {}

  /**
   * Recalculate winning and lost player points with Elo rating algorithm, invented by Arpad Elo.
   * ref: https://en.wikipedia.org/wiki/Elo_rating_system
   */
  public calculatePlayersPoints(
    winningPlayerCurrentPoints: number,
    lostPlayerCurrentPoints: number
  ) {
    const winningPlayerWinProbability =
      winningPlayerCurrentPoints /
      (winningPlayerCurrentPoints + lostPlayerCurrentPoints);

    const lostPlayerWinProbability =
      lostPlayerCurrentPoints /
      (winningPlayerCurrentPoints + lostPlayerCurrentPoints);

    const winningPlayerPoints =
      winningPlayerCurrentPoints +
      this.eloAlgorithmShiftingFactor * (1 - winningPlayerWinProbability);

    const lostPlayerPoints =
      lostPlayerCurrentPoints +
      this.eloAlgorithmShiftingFactor * (0 - lostPlayerWinProbability);

    return { winningPlayerPoints, lostPlayerPoints };
  }
}
