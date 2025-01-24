import { useState, useEffect } from "react";
import axios from "axios";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import LinearQ from "../components/LinearQ";
import NumberQ from "../components/NumberQ";
import { useNavigate } from "react-router-dom";

interface myData {
  [key: string]: string | number;
}

// TODO: change id for items to be called QId for clarity?
interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

// TODO: delete id, names (and maybe classNames?) in question components where they are not used...
// ...(only LinearQ has a useful id it seems like so far)
const Form = ({ selectedSurvey }: { selectedSurvey: string }) => {
  const [questions, setQuestions] = useState<Item[]>([]);
  const [update] = useState(false);
  const [data, setData] = useState({});

  const updateData = (newData: myData) => {
    setData(newData);
  };

  const getQuestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8800/questions/" + selectedSurvey
      );
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const navigate = useNavigate();

  // this function ensures the submition does not contain empty values
  const checkNull = (obj: myData): boolean => {
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
        await axios.post(
          "http://localhost:8800/submit/" + selectedSurvey,
          payload
        );
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
              <LinearQ
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
        <button className="form-submit" onClick={submitForm}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Form;
