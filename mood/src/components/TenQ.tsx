import React from "react";
import { useState } from "react";

interface Props {
  question: string;
}

const TenQ = ({ question }: Props) => {
  const [rating, setRating] = useState(null);

  // TODO: come and do the type assigment correctly. also not sure if there is a
  // better way... but it works for now
  const handleRatingClick = (value: any) => {
    if (rating) {
      let previous = document.getElementById(`${rating}-button`);
      if (previous) {
        previous.className = "rating-button btn btn-secondary";
      }
    }
    setRating(value);
    const element = document.getElementById(`${value}-button`);
    if (element) {
      element.className = "rating-button btn btn-primary";
    }
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      buttons.push(
        <button
          className="rating-button btn btn-secondary"
          id={`${i}-button`}
          key={i}
          onClick={() => handleRatingClick(i)}
          style={{ marginRight: "5px" }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="question">
      <p>{question}</p>
      <div>{renderButtons()}</div>
    </div>
  );
};

export default TenQ;
