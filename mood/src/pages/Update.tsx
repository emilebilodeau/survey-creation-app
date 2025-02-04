import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import YesNoQ from "../components/YesNoQ";
import TextQ from "../components/TextQ";
import LinearQ from "../components/LinearQ";
import NumberQ from "../components/NumberQ";
import DateQ from "../components/DateQ";
import NoSurvey from "../components/NoSurvey";

interface myData {
  [key: string]: string | number;
}

interface Item {
  question: string;
  type: string;
  id: number;
  alias: string;
}

const Update = ({ selectedSurvey }: { selectedSurvey: string }) => {
  if (selectedSurvey === "undefined" || !selectedSurvey) {
    return <NoSurvey />;
  }

  const [questions, setQuestions] = useState<Item[]>([]);
  const [update, setUpdate] = useState(false);
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

  // the syntax { id } gets only the id key value. without brackets the whole object is retrieved
  // to be more explicit, can write useParams<{ id: string }>()
  const { id } = useParams();

  const fetchRow = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/getrow/${selectedSurvey}/${id}`
      );
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
    getQuestions();
    fetchRow();
  }, []);

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
          await axios.put(
            `http://localhost:8800/update/${selectedSurvey}/${id}`,
            data
          );
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
