import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import "reactjs-popup/dist/index.css";

const Home = () => {
  const [questionnaireList, setQuestionnaireList] = useState<[]>([]);
  // NOTE: needs to become useContext instead? then stored at the highest possible level in the app
  const [questionnaire, setQuestionnaire] = useState<string>("");

  const ref = useRef<PopupActions | null>(null);
  const closeTooltip = () => ref.current?.close();

  const fetchTables = async () => {
    try {
      const table = await axios.get("http://localhost:8800/tables");
      setQuestionnaireList(table.data);
      if (table.data.length > 0) {
        setQuestionnaire("test_survey1");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  console.log(questionnaire);

  const changeQuestionnaire = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setQuestionnaire(selected);
    closeTooltip();
  };

  // TODO: need to include some kind of logic if no questionnaire exists
  const renderChoice = () => {
    if (questionnaireList.length > 0) {
      const choices = [];
      for (let i = 1; i < questionnaireList.length + 1; i++) {
        choices.push(
          <option value={`test_survey${i}`} key={`option-${i}`}>
            Survey {i}
          </option>
        );
      }
      return choices;
    }
  };

  return (
    <>
      <div className="home-box">
        <h2 id="home-header">Welcome</h2>
        <button className="general-button">
          <Link to={"/createsurvey"} className="general-link">
            Create Questionnaire
          </Link>
        </button>
        <Popup
          ref={ref}
          trigger={
            <button className="general-button"> Choose Questionnaire </button>
          }
          position="right center"
        >
          <div className="question">
            <p>Please choose from your created questionnaires:</p>
            <select onChange={changeQuestionnaire} value={questionnaire}>
              {renderChoice()}
            </select>
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Home;
