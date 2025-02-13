import { useEffect, useState } from "react";

interface Props {
  question: string;
  data: { [key: string]: string | number };
  updateData: Function;
  alias: string;
  id: number;
  update: boolean;
}

const NumberQ = ({ question, data, updateData, alias, id, update }: Props) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (update && data[alias] !== undefined) {
      setInput(String(data[alias]));
    }
  }, [update]);

  let changeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInput(newValue);
    const newNumber: number = parseFloat(newValue);
    const newData = { ...data, [alias]: newNumber };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="number"
        id={`number-${id}`}
        name={`answer-${id}`}
        onChange={changeNumber}
        value={input}
      ></input>
    </div>
  );
};

export default NumberQ;
