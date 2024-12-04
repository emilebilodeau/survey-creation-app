interface Props {
  question: string;
  data: { [key: string]: string | number };
  updateData: Function;
  alias: string;
  id: number;
  update: boolean;
}

const TextQ = ({ question, data, updateData, alias, id, update }: Props) => {
  let changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newData = { ...data, [alias]: newValue };
    updateData(newData);
  };

  const val = update ? data[alias] : undefined;

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="text"
        id={`text-${id}`}
        name={`answer-${id}`}
        onChange={changeText}
        defaultValue={val || ""}
      ></input>
    </div>
  );
};

export default TextQ;
