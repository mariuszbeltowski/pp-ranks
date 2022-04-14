jest.mock("./ranking.service");
jest.mock("../repositories/player.repository");

import { PlayerService } from "./player.service";
import { RankingService } from "./ranking.service";
import { PlayerRepository } from "../repositories/player.repository";
import { getMockedPlayer } from "../utils/player-mocks";

const setup = () => {
  const rankingService = new RankingService(10) as jest.Mocked<RankingService>;

  const playerRepository = new PlayerRepository(
    {} as any,
    {} as any
  ) as jest.Mocked<PlayerRepository>;

  return {
    rankingService,
    playerRepository,
    playerService: new PlayerService(playerRepository, rankingService),
  };
};

describe("PlayerService", () => {
  it("should add player and return", async () => {
    const { playerService, playerRepository } = setup();

    const player = { name: "Player 1", points: 100, id: "player1" };
    playerRepository.addPlayer.mockResolvedValueOnce({
      insertedId: player.id,
      acknowledged: true,
    });

    const players = [
      getMockedPlayer(player),
      getMockedPlayer({ name: "Player 2", points: 100, id: "player2" }),
    ];

    playerRepository.getPlayersOrderedByPointsDesc.mockResolvedValueOnce(
      players
    );

    const rankedPlayer = await playerService.addPlayer("name");

    expect(rankedPlayer.id).toBe(player.id);
    expect(rankedPlayer.name).toBe(player.name);
    expect(rankedPlayer.points).toBe(player.points);
  });

  it("should get ranked players with correct ranks", async () => {
    const { playerService, playerRepository } = setup();

    const players = [
      getMockedPlayer({ name: "Player 3", points: 300, id: "player3" }),
      getMockedPlayer({ name: "Player 2", points: 200, id: "player2" }),
      getMockedPlayer({ name: "Player 1", points: 100, id: "player1" }),
    ];

    playerRepository.getPlayersOrderedByPointsDesc.mockResolvedValueOnce(
      players
    );

    const rankedPlayers = await playerService.getRankedPlayers();

    expect(rankedPlayers[0].id).toBe("player3");
    expect(rankedPlayers[0].rank).toBe(1);
  });

  it("should purge to remove all", async () => {
    const { playerService, playerRepository } = setup();

    await playerService.removeAll();

    expect(playerRepository.purge).toHaveBeenCalledTimes(1);
  });

  it("should fail register match score for the same ids", async () => {
    const { playerService } = setup();

    await expect(
      playerService.registerMatchScore("p1", "p1")
    ).rejects.toThrowError(/same/i);
  });

  it("should fail register match score if winner is not found", async () => {
    const { playerService, playerRepository } = setup();

    const players = [
      getMockedPlayer({ name: "Player 2", points: 200, id: "p2" }),
    ];

    await playerRepository.updatePlayers.mockImplementationOnce(
      (_playerIds, cb) => {
        cb(players);
        return Promise.resolve();
      }
    );

    await expect(
      playerService.registerMatchScore("p1", "p2")
    ).rejects.toThrowError(/winning/i);
  });

  it("should fail register match score if lost is not found", async () => {
    const { playerService, playerRepository } = setup();

    const players = [
      getMockedPlayer({ name: "Player 1", points: 100, id: "p1" }),
    ];

    playerRepository.updatePlayers.mockImplementationOnce((_playerIds, cb) => {
      cb(players);
      return Promise.resolve();
    });

    await expect(
      playerService.registerMatchScore("p1", "p2")
    ).rejects.toThrowError(/lost/i);
  });

  it("should register match score and update players", async () => {
    const { playerService, playerRepository, rankingService } = setup();

    const winningId = "p1";
    const lostId = "p2";

    const players = [
      getMockedPlayer({ name: "Player 1", points: 100, id: winningId }),
      getMockedPlayer({ name: "Player 2", points: 100, id: lostId }),
    ];

    rankingService.calculatePlayersPoints.mockImplementation(
      (winnerPoints, lostPoints) => ({
        winningPlayerPoints: winnerPoints + 100,
        lostPlayerPoints: lostPoints - 50,
      })
    );

    playerRepository.updatePlayers.mockImplementationOnce((_playerIds, cb) => {
      const updatedPlayers = cb(players);
      expect(updatedPlayers[0]._id).toBe(winningId);
      expect(updatedPlayers[0].points).toBe(200);

      expect(updatedPlayers[1]._id).toBe(lostId);
      expect(updatedPlayers[1].points).toBe(50);
      return Promise.resolve();
    });

    playerRepository.getPlayersOrderedByPointsDesc.mockResolvedValue(players);

    const { winningPlayer, lostPlayer } =
      await playerService.registerMatchScore(winningId, lostId);

    expect(winningPlayer.id).toBe(winningId);
    expect(lostPlayer.id).toBe(lostId);
  });
});
