import React, { FormEvent, useState } from "react";
import { useRegisterMatchScore } from "../queries/RegisterMatchScore";
import { useRanking } from "../queries/Ranking";
import FormSubmitButton from "./FormSubmitButton";

function RegisterMatchForm() {
  const EMPTY_SELECT = "none";
  const [winningPlayerId, setWinningPlayerId] = useState(EMPTY_SELECT);
  const [lostPlayerId, setLostPlayerId] = useState(EMPTY_SELECT);

  const {
    data: playersData,
    error: playersError,
    loading: playersLoading,
  } = useRanking();

  const [registerMatch, { data, loading, error }] = useRegisterMatchScore();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (winningPlayerId !== EMPTY_SELECT && lostPlayerId !== EMPTY_SELECT) {
      registerMatch({ variables: { winningPlayerId, lostPlayerId } });
      setWinningPlayerId(EMPTY_SELECT);
      setLostPlayerId(EMPTY_SELECT);
    }
  };

  if (playersError)
    return (
      <div className="mx-auto max-w-md text-center">{playersError.message}</div>
    );

  if (playersLoading)
    return <div className="mx-auto max-w-md text-center">Loading...</div>;

  return (
    <div className="mx-auto block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-10">
      <h2 className="mt-5 font-medium">Register match score</h2>
      <p>Select players to register match score</p>
      <form onSubmit={(e) => onFormSubmit(e)} className="mt-5">
        <div className="form-group mb-4">
          <p className="text-left pb-1 text-gray-600">Winning player</p>
          <select
            value={winningPlayerId}
            onChange={(e) => setWinningPlayerId(e.target.value)}
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
              focus:border-blue-600 focus:outline-none"
            aria-label="winning-select"
          >
            <option value={EMPTY_SELECT}>Open this select menu</option>
            {playersData?.rankedPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <p className="text-left pb-1 text-gray-600">Lost player</p>
          <select
            value={lostPlayerId}
            onChange={(e) => setLostPlayerId(e.target.value)}
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
              focus:border-blue-600 focus:outline-none"
            aria-label="lost-select"
          >
            <option value={EMPTY_SELECT}>Open this select menu</option>
            {playersData?.rankedPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <label className="inline-block p-2 text-red-800 motion-safe:fade-up">
            {error.message}
          </label>
        ) : (
          <></>
        )}
        {data ? (
          <label className="inline-block p-2 text-green-800 motion-safe:fade-up">
            {`Registered "${data.registerMatchScore.winningPlayer.name}" won with "${data.registerMatchScore.lostPlayer.name}"`}
          </label>
        ) : (
          <></>
        )}
        <FormSubmitButton
          loading={loading}
          text={"Register match"}
          label={"register-button"}
          disabled={
            loading ||
            winningPlayerId === EMPTY_SELECT ||
            lostPlayerId === EMPTY_SELECT
          }
        />
      </form>
    </div>
  );
}

export default RegisterMatchForm;
