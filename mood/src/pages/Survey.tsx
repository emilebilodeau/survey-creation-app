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

const Survey = () => {
  // TODO: need to figure out how to deal with the alias issue...
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
  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setQuestionData({ ...questionData, type: newType });
  };

  // TODO: control the popup so that it closes when questionHandeClick is used
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

  const questionHandleDelete = (event: any) => {
    const qId = parseFloat(event.target.getAttribute("q-id"));
    const updatedList = questions.filter((obj) => obj.id !== qId);
    setQuestions(updatedList);
  };

  // TODO: automatically add the TenQ how did you feel question
  const questionSubmit = () => {
    alert("Questionnaire created");
  };

  return (
    <>
      <div className="survey-box">
        <h2>Survey Creation</h2>
        {questions.map((item) => {
          const output = [
            <button
              className="survey-button"
              key={`delete-${item.id}`}
              onClick={questionHandleDelete}
              q-id={item.id}
            >
              Delete
            </button>,
          ];
          if (item.type === "yesNo") {
            output.unshift(
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
            output.unshift(
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
            output.unshift(
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
            output.unshift(
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
          return output;
        })}
        <div>
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
              <p>Question type:</p>
              <select
                name="question-type"
                onChange={changeType}
                value={questionData.type}
              >
                <option value="yesNo">Yes/No</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="linear">Linear</option>
              </select>
            </div>
            <button className="survey-button" onClick={questionHandleClick}>
              Confirm
            </button>
          </Popup>
        </div>

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
