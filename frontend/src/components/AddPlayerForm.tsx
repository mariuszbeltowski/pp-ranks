import React, { FormEvent, useState } from "react";
import { useAddPlayer } from "../queries/AddPlayer";
import { FormNotice } from "./FormNotice";
import FormSubmitButton from "./FormSubmitButton";

function AddPlayerForm() {
  const [name, setName] = useState("");

  const [addPlayer, { data, loading, error }] = useAddPlayer();
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 0 && !loading) {
      addPlayer({ variables: { name } });
      setName("");
    }
  };

  return (
    <div className="mx-auto block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-10">
      <h2 className="my-5 font-medium">Add new player</h2>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <div className="form-group mb-4">
          <NameInput name={name} setName={setName} />
          {error && <FormNotice text={error.message} color={"red"} />}
          {data && (
            <FormNotice
              text={`Player "${data.addPlayer.name}" created successfully`}
              color={"green"}
            />
          )}
        </div>
        <FormSubmitButton
          loading={loading}
          text={"Create"}
          label={"create-button"}
          disabled={loading || !name}
        />
      </form>
    </div>
  );
}

interface NameInputProps {
  name: string;
  setName: (value: string) => void;
}

function NameInput({ name, setName }: NameInputProps) {
  return (
    <input
      type="text"
      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
              border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id="nameInput"
      aria-label="name-input"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

export default AddPlayerForm;
