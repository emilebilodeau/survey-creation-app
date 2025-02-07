import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import "reactjs-popup/dist/index.css";
import { useCookies } from "react-cookie";

interface Entries {
  survey_name: string;
  survey_clean: string;
}

const Home = () => {
  const [questionnaireList, setQuestionnaireList] = useState<Entries[]>([]);
  // selected questionnaire
  const [cookies, setCookie, removeCookie] = useCookies(["selectedSurvey"]);
  console.log(cookies.selectedSurvey);

  const ref = useRef<PopupActions | null>(null);
  const closeTooltip = () => ref.current?.close();

  const fetchTables = async () => {
    try {
      const table = await axios.get("http://localhost:8800/tables");
      const cleanedList: Entries[] = [];
      table.data.forEach((obj: any) => {
        const { active, id, survey_answers, ...cleanObject } = obj;
        cleanedList.push(cleanObject);
      });

      setQuestionnaireList(cleanedList);
      if (cleanedList.length > 0) {
        if (cookies.selectedSurvey === "undefined" || !cookies.selectedSurvey) {
          setCookie("selectedSurvey", cleanedList[0].survey_name, {
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
      questionnaireList.forEach((survey: Entries) => {
        choices.push(
          <option
            value={survey.survey_name}
            key={`option-${survey.survey_clean}`}
          >
            {survey.survey_clean}
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

  // TODO: fix this function and the endpoint
  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this survey? This will delete form questions and all data"
      )
    ) {
      try {
        await axios.delete(
          "http://localhost:8800/deletetable/" + cookies.selectedSurvey
        );
        const updatedList = questionnaireList.filter(
          (questionnaire) => questionnaire !== cookies.selectedSurvey
        );
        setQuestionnaireList(updatedList);
        if (updatedList.length > 0) {
          setCookie("selectedSurvey", updatedList[0], {
            path: "/",
            maxAge: 86400000, // a day
          });
        } else {
          setCookie("selectedSurvey", "undefined");
        }
        alert("Deletion complete");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderSelected = () => {
    const output: JSX.Element[] = [];
    if (
      cookies.selectedSurvey !== "undefined" &&
      typeof cookies.selectedSurvey === "string"
    ) {
      const surveyName: string = `Survey ${cookies.selectedSurvey.slice(-1)}`;
      output.push(
        <div key="selected" className="survey-choice">
          <p>Selected survey: {surveyName}</p>
          <button className="general-button" onClick={handleDelete}>
            Delete Questionnaire
          </button>
        </div>
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
        {renderSelected()}
      </div>
    </>
  );
};

export default Home;
