import { useQuery } from "@apollo/client";
import React from "react";
import { PlayersRankingData, PLAYERS_RANKING } from "../queries/player-ranking";
import RankingRow from "./RankingRow";

function Ranking() {
  const { loading, error, data } =
    useQuery<PlayersRankingData>(PLAYERS_RANKING);

  if (error)
    return <div className="mx-auto max-w-md text-center">{error.message}</div>;

  if (loading)
    return <div className="mx-auto max-w-md text-center">Loading...</div>;

  return (
    <div className="flex flex-col mx-auto max-w-md md:max-w-2xl">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b ">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.rankedPlayers.map((player) => (
                  <RankingRow key={player.id} player={player} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
