import React from "react";
import { useState } from "react";

interface Props {
  question: string;
  data: object;
  updateData: Function;
  id: number;
}

const TenQ = ({ question, data, updateData, id }: Props) => {
  const [rating, setRating] = useState(null);

  // TODO: possibly improve this code later - might be a more graceful way of doing this
  const handleRatingClick = (value: any) => {
    if (rating) {
      let previous = document.getElementById(`${rating}-button-${id}`);
      if (previous) {
        previous.className = "rating-button btn btn-secondary";
      }
    }
    setRating(value);
    const element = document.getElementById(`${value}-button-${id}`);
    if (element) {
      element.className = "rating-button btn btn-primary";
    }
    const newData = { ...data, [question]: value };
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
