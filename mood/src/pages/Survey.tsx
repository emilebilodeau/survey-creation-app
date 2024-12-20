import { useState } from "react";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import NumberQ from "../components/NumberQ";
import TenQ from "../components/TenQ";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

// NOTE: maybe keep survey it's own thing since i want it to behave very specifically
// NOTE: instead, merge the form and update page
const Survey = () => {
  // TODO: need to figure out how to deal with the alias...
  const defaultDict: Item = {
    question: "",
    type: "yesNo",
    id: 0,
    alias: "",
  };

  const [id, setId] = useState(0);
  // individual question when adding
  const [questionData, setQuestionData] = useState<Item>(defaultDict);
  // complete question list
  const [questions, setQuestions] = useState<Item[]>([]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setQuestionData({ ...questionData, question: newName });
  };
  const changeType = (event: any) => {
    const newType = event.target.value;
    setQuestionData({ ...questionData, type: newType });
  };

  // need to auto increment id. the reason why it is done directly is because relying on the
  // asynchronous state update may cause the defaultDict to not be correctly updated
  const questionHandleClick = () => {
    if (questionData.question === "") {
      alert("Please enter a question name before confirming");
    } else {
      setQuestions([...questions, questionData]);
      const nextId = id + 1;
      setId(nextId);
      setQuestionData({ ...defaultDict, id: nextId });
    }
  };

  console.log(questions);

  // TODO: automatically add the TenQ how did you feel question
  const questionSubmit = () => {
    alert("Questionnaire Created");
  };

  return (
    <>
      <div className="survey-box">
        <h2>Survey Creation</h2>
        {questions.map((item) => {
          if (item.type === "yesNo") {
            return (
              <YesNoQ
                question={item.question}
                data={{}}
                updateData={() => {}}
                alias={item.alias}
                id={item.id}
                key={item.id}
                update={false}
              />
            );
          } else if (item.type === "text") {
            return (
              <TextQ
                question={item.question}
                data={{}}
                updateData={() => {}}
                alias={item.alias}
                id={item.id}
                key={item.id}
                update={false}
              />
            );
          } else if (item.type === "linear") {
            return (
              <TenQ
                question={item.question}
                data={{}}
                updateData={() => {}}
                alias={item.alias}
                id={item.id}
                key={item.id}
                update={false}
              />
            );
          } else if (item.type === "number") {
            return (
              <NumberQ
                question={item.question}
                data={{}}
                updateData={() => {}}
                alias={item.alias}
                id={item.id}
                key={item.id}
                update={false}
              />
            );
          }
        })}
        <Popup
          trigger={<button className="survey-button"> Add question </button>}
          position="right center"
        >
          <div className="question">
            <p>Question:</p>
            <input
              className="choose-type"
              type="text"
              onChange={changeName}
              value={questionData.question}
            ></input>
          </div>
          <div className="question">
            <select
              name="question-type"
              onChange={changeType}
              value={questionData.type}
            >
              <option value="yesNo">Yes/No</option>
              <option value="text">Text</option>
              <option value="linear">Linear</option>
              <option value="number">Number</option>
            </select>
          </div>
          <button className="survey-button" onClick={questionHandleClick}>
            Confirm
          </button>
        </Popup>
        <div>
          <button className="form-submit" onClick={questionSubmit}>
            Submit
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default Survey;
