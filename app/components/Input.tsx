import React, { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";

type Input = {
  name: string;
  count: string | number;
  label?: string;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
};

const Input = ({ name, count, label, setState }: Input) => {
  const [value, setValue] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (confirm) {
      setState((prev) => [...prev, value]);
    }
  }, [confirm]);

  return (
    <div className="h-10 w-full relative flex mb-[10px]">
      <input
        type="text"
        name={`${name}-${count}`}
        id={`${name}-${count}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
      />
      <label
        htmlFor={`${name}-${count}`}
        className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      {value && (
        <button
          onClick={() => setConfirm(true)}
          type="button"
          className={`absolute right-1 h-10 px-2 ${
            confirm ? "text-green-400" : "text-blue-400"
          } rounded-md`}
        >
          <GiConfirmed />
        </button>
      )}
    </div>
  );
};

export default Input;
