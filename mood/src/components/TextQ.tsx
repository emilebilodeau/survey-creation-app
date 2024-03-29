import React, { useState } from "react";

interface Props {
  question: string;
  data: object;
  updateData: Function;
  alias: string;
  id: number;
}

const TextQ = ({ question, data, updateData, alias, id }: Props) => {
  let changeText = (event: any) => {
    const newValue = event.target.value;
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
      ></input>
    </div>
  );
};

export default TextQ;
