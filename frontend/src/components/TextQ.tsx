import React, { useState, useEffect } from "react";

interface Props {
  question: string;
  data: { [key: string]: string | number };
  updateData: Function;
  alias: string;
  id: number;
  update: boolean;
}

const TextQ = ({ question, data, updateData, alias, id, update }: Props) => {
  const [input, setInput] = useState("");

  // sets the value retrieved from the row if updating an entry. otherwise, default of input is used
  useEffect(() => {
    if (update && data[alias] !== undefined) {
      setInput(String(data[alias]));
    }
  }, [update]);

  let changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInput(newValue);
    const newData = { ...data, [alias]: newValue };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="text"
        id={`text-${id}`}
        name={`answer-${id}`}
        onChange={changeText}
        value={input}
      ></input>
    </div>
  );
};

export default TextQ;
