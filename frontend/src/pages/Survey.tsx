import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import NumberQ from "../components/NumberQ";
import LinearQ from "../components/LinearQ";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import "reactjs-popup/dist/index.css";

interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

const Survey = () => {
  const defaultDict: Item = {
    question: "",
    type: "yesNo",
    id: 1,
    alias: "",
  };

  // for popup: this ensures that TypeScript knows the ref object will eventually reference
  // an object with open, close, and toggle methods or null.
  const ref = useRef<PopupActions | null>(null);
  const closeTooltip = () => ref.current?.close();

  const [id, setId] = useState(1);
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
  const changeAlias = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAlias = event.target.value;
    setQuestionData({ ...questionData, alias: newAlias });
  };

  const validateAlias = (alias: string): boolean => {
    // MySQL column names must:
    // - begin with a letter or an underscore
    // - contain only letters, numbers, and underscores
    // - be between 1 and 64 characters long (as per MySQL's max column name length)
    const regex = /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/;
    return regex.test(alias);
  };

  // check that there are no duplicate alias; can't have two columns with the same name
  const checkDuplicates = (alias: string): boolean => {
    const aliasSet = new Set(questions.map((q) => q.alias));
    return aliasSet.has(alias);
  };

  // need to auto increment id. the reason why it is done directly is because relying on the
  // asynchronous state update may cause the defaultDict to not be correctly updated
  const questionHandleClick = () => {
    if (questionData.question === "" || questionData.alias === "") {
      alert("Please complete all fields before confirming");
    } else if (!validateAlias(questionData.alias)) {
      alert(
        "Invalid alias: ensure it is one word starting with a letter and with no special characters"
      );
    } else if (checkDuplicates(questionData.alias)) {
      alert(
        "This alias has already been used for a previous question; please choose a unique one"
      );
    } else {
      setQuestions([...questions, questionData]);
      const nextId = id + 1;
      setId(nextId);
      setQuestionData({ ...defaultDict, id: nextId });
      closeTooltip();
    }
  };

  // this filters out the questions list by getting rid of the object which contains the id selected
  const questionHandleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const qId = parseFloat(event.currentTarget.getAttribute("q-id") || "0");
    const updatedList = questions.filter((obj) => obj.id !== qId);
    setQuestions(updatedList);
  };

  const navigate = useNavigate();

  const questionSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log(questions);
    if (questions.length !== 0) {
      try {
        await axios.post("http://localhost:8800/createsurvey", questions);
        alert("Questionnaire created");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Questionnaire cannot be empty");
    }
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
              <LinearQ
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
            ref={ref}
            trigger={<button className="survey-button"> Add question </button>}
            position="right center"
          >
            <div className="question">
              <p>Question:</p>
              <input
                type="text"
                onChange={changeName}
                value={questionData.question}
              ></input>
            </div>
            <div className="question">
              <p>Question type:</p>
              <select onChange={changeType} value={questionData.type}>
                <option value="yesNo">Yes/No</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="linear">Linear</option>
              </select>
            </div>
            <div className="question">
              <p>Alias:</p>
              <input
                type="text"
                onChange={changeAlias}
                value={questionData.alias}
              ></input>
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
