import { useState } from "react";
import axios from "axios";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import TenQ from "../components/TenQ";
import NumberQ from "../components/NumberQ";
import { useNavigate } from "react-router-dom";

interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

const Form = () => {
  // NOTE: hard coding these questions for now, related to the default table created
  // in the backend. the way i use alias might need to change later when i implement
  // the survey creation feature, but they are currently in place to manage the table
  // in the database easier
  const questions: Item[] = [
    {
      question: "How did you feel overall today",
      type: "linear",
      id: 1,
      alias: "mood",
    },
    { question: "Hours of sleep", type: "number", id: 2, alias: "sleep" },
    {
      question: "Disrupted Sleep",
      type: "yesNo",
      id: 3,
      alias: "sleepDisruption",
    },
    {
      question: "Amount of intentional exercise in minutes",
      type: "number",
      id: 4,
      alias: "exercise",
    },
    {
      question: "Spent at least 1 hour outside the house",
      type: "yesNo",
      id: 5,
      alias: "outside",
    },
    {
      question: "Meditated atleast 5 minutes",
      type: "yesNo",
      id: 6,
      alias: "meditation",
    },
    {
      question: "Did at least 1 thing outside of routine",
      type: "yesNo",
      id: 7,
      alias: "breakRoutine",
    },
    {
      question: "Had a meaningful social interaction",
      type: "yesNo",
      id: 8,
      alias: "socialInteraction",
    },
    {
      question: "Estimate of time spent ruminating in minutes",
      type: "number",
      id: 9,
      alias: "rumination",
    },
    {
      question: "Drank more than 3 drinks the day before",
      type: "yesNo",
      id: 10,
      alias: "drank",
    },
    {
      question: "Extra (any notable events, good or bad?)",
      type: "text",
      id: 11,
      alias: "extra",
    },
  ];

  const [data, setData] = useState({});

  const updateData = (newData: any) => {
    setData(newData);
  };

  const navigate = useNavigate();

  // this function ensures the submition does not contain empty values
  const checkNull = (obj: { [key: string]: any }): boolean => {
    for (const key in obj) {
      const value = obj[key];
      if (value === null || value === "" || Number.isNaN(value)) {
        return true;
      }
    }
    return false;
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    console.log(data);
    console.log("submitted");

    if (checkNull(data) || Object.keys(data).length !== questions.length) {
      alert("Please complete all the field");
    } else {
      // in milliseconds
      const timestamp = Date.now();
      const payload = { ...data, timestamp: timestamp };
      try {
        await axios.post("http://localhost:8800/submit", payload);
        alert("Completed");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="survey-box">
        <h2>Form Questions</h2>
        {questions.map((item) => {
          if (item.type === "yesNo") {
            return (
              <YesNoQ
                question={item.question}
                data={data}
                updateData={updateData}
                alias={item.alias}
                id={item.id}
                key={item.id}
              />
            );
          } else if (item.type === "text") {
            return (
              <TextQ
                question={item.question}
                data={data}
                updateData={updateData}
                alias={item.alias}
                id={item.id}
                key={item.id}
              />
            );
          } else if (item.type === "linear") {
            return (
              <TenQ
                question={item.question}
                data={data}
                updateData={updateData}
                alias={item.alias}
                id={item.id}
                key={item.id}
              />
            );
          } else if (item.type === "number") {
            return (
              <NumberQ
                question={item.question}
                data={data}
                updateData={updateData}
                alias={item.alias}
                id={item.id}
                key={item.id}
              />
            );
          }
        })}
        <button className="form-submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;
