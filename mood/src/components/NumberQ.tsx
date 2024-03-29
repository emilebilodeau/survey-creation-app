import React from "react";

interface Props {
  question: string;
  data: object;
  updateData: Function;
  alias: string;
  id: number;
}

const NumberQ = ({ question, data, updateData, alias, id }: Props) => {
  let changeNumber = (event: any) => {
    const answer = event.target.value;
    const newNumber: number = parseFloat(answer);
    const newData = { ...data, [alias]: newNumber };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="number"
        id={`number-${id}`}
        name={`answer-${id}`}
        onChange={changeNumber}
      ></input>
    </div>
  );
};

export default NumberQ;
