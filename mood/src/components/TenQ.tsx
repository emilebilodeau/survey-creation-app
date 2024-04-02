import React from "react";
import { useState } from "react";

interface Props {
  question: string;
  data: object;
  updateData: Function;
  alias: string;
  id: number;
}

const TenQ = ({ question, data, updateData, alias, id }: Props) => {
  const [rating, setRating] = useState(null);

  const handleRatingClick = (value: any) => {
    // removes the "active" color from previous button, if there is one
    if (rating) {
      let previous = document.getElementById(`${rating}-button-${id}`);
      if (previous) {
        previous.className = "rating-button btn btn-secondary";
      }
    }
    setRating(value);
    const element = document.getElementById(`${value}-button-${id}`);
    // sets the newly click button to "active"
    if (element) {
      element.className = "rating-button btn btn-primary";
    }
    const newData = { ...data, [alias]: value };
    updateData(newData);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      buttons.push(
        <button
          className="rating-button btn btn-secondary"
          id={`${i}-button-${id}`}
          key={i}
          onClick={() => handleRatingClick(i)}
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
