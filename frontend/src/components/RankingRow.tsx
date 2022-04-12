import React from "react";
import { PlayerRanking } from "../queries/player-ranking";

interface Props {
  player: PlayerRanking;
}

export default function RankingRow(props: Props) {
  const { player } = props;

  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {player.id}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {player.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {player.points}
      </td>
    </tr>
  );
}
