import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import TenQ from "../components/TenQ";
import NumberQ from "../components/NumberQ";
import DateQ from "../components/DateQ";

interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

const Update = () => {
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

  const [update, setUpdate] = useState(false);
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

  // the syntax { id } gets only the id key value. without brackets the whole object is retrieved
  // to be more explicit, can write useParams<{ id: string }>()
  const { id } = useParams();

  const fetchRow = async () => {
    try {
      const response = await axios.get("http://localhost:8800/getrow/" + id);
      if (response.data) {
        const row = response.data[0];
        const { id, ...cleanedRow } = row;
        updateData(cleanedRow);
        setUpdate(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRow();
  }, [id]);

  const submitForm = async (e: any) => {
    e.preventDefault();

    console.log(data);
    console.log("submitted");

    if (checkNull(data) || Object.keys(data).length !== questions.length + 1) {
      alert("Please complete all the field");
    } else {
      if (confirm("Confirm data update?")) {
        // in milliseconds
        try {
          await axios.put("http://localhost:8800/update/" + id, data);
          alert("Completed");
          navigate("/data");
        } catch (err) {
          console.log(err);
        }
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
                update={update}
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
                update={update}
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
                update={update}
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
                update={update}
              />
            );
          }
        })}
        <DateQ
          data={data}
          updateData={updateData}
          key={"date-picker"}
          update={update}
        />
        <button className="form-submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Update;
