import { ApolloError } from "apollo-server";
import { Player, mockPlayersNames } from "../models/player";
import { RankedPlayer } from "../models/ranked-player";
import { PlayerRepository } from "../repositories/player.repository";
import { RankingService } from "./ranking.service";

export class PlayerService {
  constructor(
    private playerRepository: PlayerRepository,
    private rankingService: RankingService
  ) {}

  async addPlayer(name: string) {
    const newPlayer = new Player(name);
    const inserted = await this.playerRepository.addPlayer(newPlayer);

    return (await this.getRankedPlayer(inserted.insertedId))!;
  }

  async registerMatchScore(winningPlayerId: string, lostPlayerId: string) {
    if (winningPlayerId === lostPlayerId) {
      throw new ApolloError("Provided players are the same", "SAME_PLAYERS");
    }

    await this.playerRepository.updatePlayers(
      [winningPlayerId, lostPlayerId],
      (players) => {
        const winningPlayer = players.find(
          (player) => player._id === winningPlayerId
        );

        if (!winningPlayer) {
          throw new ApolloError(
            "Winning player not found",
            "WINNING_PLAYER_NOT_FOUND"
          );
        }

        const lostPlayer = players.find(
          (player) => player._id === lostPlayerId
        );

        if (!lostPlayer) {
          throw new ApolloError(
            "Lost player not found",
            "LOST_PLAYER_NOT_FOUND"
          );
        }

        const { winningPlayerPoints, lostPlayerPoints } =
          this.rankingService.calculatePlayersPoints(
            winningPlayer.points,
            lostPlayer.points
          );

        return [
          { ...winningPlayer, points: winningPlayerPoints },
          { ...lostPlayer, points: lostPlayerPoints },
        ];
      }
    );

    return {
      lostPlayer: (await this.getRankedPlayer(lostPlayerId))!,
      winningPlayer: (await this.getRankedPlayer(winningPlayerId))!,
    };
  }

  async getRankedPlayers() {
    const players = await this.playerRepository.getPlayersOrderedByPointsDesc();

    return players.map((player, index) => RankedPlayer.from(player, index + 1));
  }

  async getRankedPlayer(id: string) {
    const rankedPlayers = await this.getRankedPlayers();
    return rankedPlayers.filter((player) => player.id === id).at(0);
  }

  async removeAll() {
    return this.playerRepository.purge();
  }

  async populateMockData() {
    return this.playerRepository.addPlayers(
      mockPlayersNames.map((name) => new Player(name))
    );
  }
}
