import React, { useState } from "react";

interface Props {
  question: string;
}

// NOTE: this component might become problematic for datatypes...
// i will want numbers here mostly, not strings
const TextQ = ({ question }: Props) => {
  let [inputValue, setInputValue] = useState("");

  let changeText = (event: any) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="text"
        id={`text-${question}`}
        name={`answer-${question}`}
        onChange={changeText}
        value={inputValue}
      ></input>
    </div>
  );
};

export default TextQ;
