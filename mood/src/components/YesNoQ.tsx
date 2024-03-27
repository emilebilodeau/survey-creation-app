import React, { useState } from "react";

interface Props {
  question: string;
  data: object;
  updateData: Function;
  id: number;
}
const YesNoQ = ({ question, data, updateData, id }: Props) => {
  let changeResponse = (event: any) => {
    const newResponse = event.target.value;
    const newData = { ...data, [question]: newResponse };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="radio"
        id={`yes-${id}`}
        name={`answer-${id}`}
        value="yes"
        onClick={changeResponse}
      ></input>
      <label htmlFor={`yes-${id}`}>Yes</label>
      <br />
      <input
        type="radio"
        id={`no-${id}`}
        name={`answer-${id}`}
        value="no"
        onClick={changeResponse}
      ></input>
      <label htmlFor={`no-${id}`}>No</label>
    </div>
  );
};

export default YesNoQ;
