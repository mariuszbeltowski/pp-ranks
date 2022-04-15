import React from "react";
import { RankedPlayer } from "../models/player";

interface Props {
  player: RankedPlayer;
}

function RankingRow({ player: { rank, name, points } }: Props) {
  return (
    <tr className="border-b motion-safe:fade-up">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {rank}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {points}
      </td>
    </tr>
  );
}

export default RankingRow;
