import React from "react";
import Loader from "./Loader";

interface Props {
  loading: boolean;
  text: string;
  disabled: boolean;
  label: string;
}

function FormSubmitButton({ loading, text, disabled, label }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      aria-label={label}
      className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
            rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
            focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-75"
    >
      {loading ? <Loader /> : <span>{text}</span>}
    </button>
  );
}

export default FormSubmitButton;
