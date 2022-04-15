import React from "react";
import { RankedPlayer } from "../models/player";

interface Props {
  player: RankedPlayer;
}

function RankingRow(props: Props) {
  const { player } = props;

  return (
    <tr className="border-b motion-safe:fade-up">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {player.rank}
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

export default RankingRow;
