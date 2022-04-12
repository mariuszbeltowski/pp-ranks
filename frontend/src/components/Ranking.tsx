import { useQuery } from "@apollo/client";
import React from "react";
import { PlayersRankingData, PLAYERS_RANKING } from "../queries/player-ranking";

export default function Ranking() {
  const { loading, error, data } =
    useQuery<PlayersRankingData>(PLAYERS_RANKING);

  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 flex flex-col space-y-1 pb-28">
      {data?.players.map((player) => (
        <div key={player.id} className="flex items-center space-x-4">
          <p>{player.id}</p>
          <p>{player.name}</p>
          <p>{player.points}</p>
        </div>
      ))}
    </div>
  );
}
