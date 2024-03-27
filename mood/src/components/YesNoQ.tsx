import React, { useState } from "react";

interface Props {
  question: string;
}

// TODO: change id and name once questions have real ids
const YesNoQ = ({ question }: Props) => {
  const [response, SetResponse] = useState(null);

  let changeResponse = (event: any) => {
    const newResponse = event.target.value;
    SetResponse(newResponse);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="radio"
        id={`yes-${question}`}
        name={`answer-${question}`}
        value="yes"
        onClick={changeResponse}
      ></input>
      <label htmlFor={`yes-${question}`}>Yes</label>
      <br />
      <input
        type="radio"
        id={`no-${question}`}
        name={`answer-${question}`}
        value="no"
        onClick={changeResponse}
      ></input>
      <label htmlFor={`no-${question}`}>No</label>
    </div>
  );
};

export default YesNoQ;
