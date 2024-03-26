import React from "react";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";

const Form = () => {
  // NOTE: hard coding these questions for now, not sure where i should put them
  // could store in database and retrieve here - figure out later
  // TODO: consider changing this data structure: should have a single array called
  // questions, which is a list of dict, that would include the question and the type
  let yesNoQuestions = [
    "Disrupted Sleep",
    "Spent at least 1 hour outside the house",
    "Meditated atleast 5 minutes",
    "Did at least 1 thing outside of routine",
    "had a meaningful social interaction",
    "drank more than 3 drinks the day before",
  ];

  let textQuestions = [
    "Hours of sleep",
    "Amount of intentional exercise and type",
    "Estimate of time spent ruminating",
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
        {/* TODO: find a better key than the index, usually a last resort */}
        {yesNoQuestions.map((item, index) => (
          <YesNoQ question={item} key={index} />
        ))}
        {textQuestions.map((item, index) => (
          <TextQ question={item} key={index} />
        ))}
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
