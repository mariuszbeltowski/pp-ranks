import React, { FormEvent, useState } from "react";
import { useRegisterMatchScore } from "../queries/RegisterMatchScore";
import { useRanking } from "../queries/Ranking";
import FormSubmitButton from "./FormSubmitButton";
import { FormNotice } from "./FormNotice";
import { RankedPlayer } from "../models/player";

const EMPTY_SELECT = "none";

function RegisterMatchForm() {
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

  const toSelectItem = ({ id, name }: RankedPlayer): SelectItem => ({
    id,
    name,
  });

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
        {playersData?.rankedPlayers && (
          <>
            <FormSelect
              value={winningPlayerId}
              onChange={setWinningPlayerId}
              label={"winning-select"}
              header={"Winning player"}
              items={playersData.rankedPlayers.map(toSelectItem)}
            />
            <FormSelect
              value={lostPlayerId}
              onChange={setLostPlayerId}
              label={"lost-select"}
              header={"Lost player"}
              items={playersData.rankedPlayers.map(toSelectItem)}
            />
          </>
        )}
        {error && <FormNotice text={error.message} color={"red"} />}
        {data && (
          <FormNotice
            text={`Registered "${data.registerMatchScore.winningPlayer.name}" won with "${data.registerMatchScore.lostPlayer.name}"`}
            color={"green"}
          />
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

interface SelectItem {
  id: string;
  name: string;
}

interface FormSelectProps {
  header: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  items: SelectItem[];
}
function FormSelect({
  label,
  header,
  value,
  onChange,
  items,
}: FormSelectProps) {
  return (
    <div className="form-group mb-4">
      <p className="text-left pb-1 text-gray-600">{header}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
            text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
              rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
              focus:border-blue-600 focus:outline-none"
        aria-label={label}
      >
        <option value={EMPTY_SELECT}>Open this select menu</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegisterMatchForm;
