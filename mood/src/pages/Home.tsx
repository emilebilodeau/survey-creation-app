import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import "reactjs-popup/dist/index.css";
import { useCookies } from "react-cookie";

const Home = () => {
  const [questionnaireList, setQuestionnaireList] = useState<Object[]>([]);
  // selected questionnaire
  const [cookies, setCookie, removeCookie] = useCookies(["selectedSurvey"]);

  const ref = useRef<PopupActions | null>(null);
  const closeTooltip = () => ref.current?.close();

  const fetchTables = async () => {
    try {
      const table = await axios.get("http://localhost:8800/tables");
      setQuestionnaireList(table.data);
      if (table.data.length > 0) {
        if (
          typeof cookies.selectedSurvey === "undefined" ||
          // TODO: this logic will need to be deleted. when implementing delete survey feature, will need...
          // ... to remove cookie. this is currently only a temporary fix and doesn't work perfectly
          table.data.length === 1
        ) {
          // this grab the name of the first survey in the list of surveys as a default
          const [, firstSurvey] = Object.entries(table.data[0])[0];
          setCookie("selectedSurvey", firstSurvey, {
            path: "/",
            maxAge: 86400000, // a day
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const changeQuestionnaire = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setCookie("selectedSurvey", selected, {
      path: "/",
      maxAge: 86400000,
    });
    closeTooltip();
  };

  const renderChoice = () => {
    const output = [];
    if (questionnaireList.length > 0) {
      const choices: JSX.Element[] = [];
      output.push(
        <select
          onChange={changeQuestionnaire}
          value={cookies.selectedSurvey}
          key="select"
        >
          {choices}
        </select>
      );
      questionnaireList.forEach((obj) => {
        const [, surveyName] = Object.entries(obj)[0];
        // NOTE: this is okay for now because survey names are generated automatically...
        // ... this might need to change if allowing the user to name their surveys
        const surveyNumber: string = surveyName.slice(-1);
        choices.push(
          <option value={surveyName} key={`option-${surveyNumber}`}>
            Survey {surveyNumber}
          </option>
        );
      });
    } else {
      output.push(
        <p key="default">Must create at least 1 questionnaire first</p>
      );
    }
    return output;
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
            {renderChoice()}
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Home;
