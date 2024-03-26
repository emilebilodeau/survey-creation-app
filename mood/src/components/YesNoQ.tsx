import React from "react";

interface Props {
  question: string;
}

// TODO: try to figure out a better id and name for the inputs...
const YesNoQ = ({ question }: Props) => {
  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="radio"
        id={`yes-${question}`}
        name={`answer-${question}`}
        value="yes"
      ></input>
      <label htmlFor={`yes-${question}`}>Yes</label>
      <br />
      <input
        type="radio"
        id={`no-${question}`}
        name={`answer-${question}`}
        value="no"
      ></input>
      <label htmlFor={`no-${question}`}>No</label>
    </div>
  );
};

export default YesNoQ;
