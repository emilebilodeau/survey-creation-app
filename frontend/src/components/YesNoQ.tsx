import { useEffect, useState } from "react";

interface Props {
  question: string;
  data: { [key: string]: string | number };
  updateData: Function;
  alias: string;
  id: number;
  update: boolean;
}
const YesNoQ = ({ question, data, updateData, alias, id, update }: Props) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (update && data[alias] !== undefined) {
      setInput(String(data[alias]));
    }
  }, [update]);

  let changeResponse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newResponse = event.target.value;
    setInput(newResponse);
    const newData = { ...data, [alias]: newResponse };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="radio"
        id={`yes-${id}`}
        name={`answer-${id}`}
        value="yes"
        onChange={changeResponse}
        checked={input === "yes"}
      ></input>
      <label htmlFor={`yes-${id}`}>Yes</label>
      <br />
      <input
        type="radio"
        id={`no-${id}`}
        name={`answer-${id}`}
        value="no"
        onChange={changeResponse}
        checked={input === "no"}
      ></input>
      <label htmlFor={`no-${id}`}>No</label>
    </div>
  );
};

export default YesNoQ;
