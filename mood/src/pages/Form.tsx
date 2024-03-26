import React from "react";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";

interface Item {
  question: string;
  type: string;
  id: number;
}

const Form = () => {
  // NOTE: hard coding these questions for now, not sure where i should put them could store in database and retrieve here - figure out later
  const questions: Item[] = [
    { question: "Hours of sleep", type: "text", id: 1 },
    { question: "Disrupted Sleep", type: "yesNo", id: 2 },
    {
      question: "Amount of intentional exercise and type",
      type: "text",
      id: 3,
    },
    {
      question: "Spent at least 1 hour outside the house",
      type: "yesNo",
      id: 4,
    },
    { question: "Meditated atleast 5 minutes", type: "yesNo", id: 5 },
    {
      question: "Did at least 1 thing outside of routine",
      type: "yesNo",
      id: 6,
    },
    { question: "had a meaningful social interaction", type: "yesNo", id: 7 },
    { question: "Estimate of time spent ruminating", type: "text", id: 8 },
  ];

  return (
    <>
      <div className="survey-box">
        <h2>Form Questions</h2>
        {/* add questions here. should put them in a list? */}
        <div className="question">
          <p>How satisfied are you with our service?</p>
          <input
            type="radio"
            id="very-satisfied"
            name="satisfaction"
            value="very-satisfied"
          />
          <label htmlFor="very-satisfied">Very Satisfied</label>
          <br />
          <input
            type="radio"
            id="satisfied"
            name="satisfaction"
            value="satisfied"
          />
          <label htmlFor="satisfied">Satisfied</label>
          <br />
          <input
            type="radio"
            id="neutral"
            name="satisfaction"
            value="neutral"
          />
          <label htmlFor="neutral">Neutral</label>
          <br />
          <input
            type="radio"
            id="dissatisfied"
            name="satisfaction"
            value="dissatisfied"
          />
          <label htmlFor="dissatisfied">Dissatisfied</label>
          <br />
          <input
            type="radio"
            id="very-dissatisfied"
            name="satisfaction"
            value="very-dissatisfied"
          />
          <label htmlFor="very-dissatisfied">Very Dissatisfied</label>
        </div>
        {/* leave the above there for now, add components below */}
        {questions.map((item) => {
          if (item.type === "yesNo") {
            return <YesNoQ question={item.question} key={item.id} />;
          } else if (item.type === "text") {
            return <TextQ question={item.question} key={item.id} />;
          }
        })}
      </div>
    </>
  );
};

export default Form;

/* ideas for how to build this form page

1. create a main div or container in this page, style it and what not, and then within in, use components to fill the form container. these components would be reusable components like "1-10 question", "yes or no question", "text question". these would have to be hardcoded at first in the container, but would make it easier to make it flexible later on if only using the same 2-3 components. challenges could include passing data to and from the components, and figuring out how to reuse components for different questions, and how to implement certain questions such as 1-10

2. use controlled inputs as seen in the tutorial by Net Ninja. would probably be easiest to get started with and is guaranteed to work, but would result in a ton of repetitive html and tons of states to deal with. this form would most likely not be reusable; it would only have 1 purpose. challenges here include managing all the html and states, and implementing certain questions such as 1-10

3. use a library such as SurveyJS. actually doesn't look bad at all and would most likely be the easiest/fastest way, however probably not as much can be learned with this method. do this after trying either method 1 or 2

*/
