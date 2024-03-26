import React from "react";

interface Props {
  question: string;
}

const TenQ = ({ question }: Props) => {
  return (
    <div className="question">
      <p>{question}</p>
    </div>
  );
};

export default TenQ;
