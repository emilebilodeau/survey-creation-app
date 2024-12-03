interface Props {
  question: string;
  data: { [key: string]: string | number };
  updateData: Function;
  alias: string;
  id: number;
  update: boolean;
}

const NumberQ = ({ question, data, updateData, alias, id, update }: Props) => {
  let changeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    const newNumber: number = parseFloat(answer);
    const newData = { ...data, [alias]: newNumber };
    updateData(newData);
  };

  // sets the value retrieved from the row if updating an entry
  const val = update ? data[alias] : undefined;

  console.log(data);

  return (
    <div className="question">
      <p>{question}</p>
      <input
        type="number"
        id={`number-${id}`}
        name={`answer-${id}`}
        onChange={changeNumber}
        defaultValue={val || ""}
      ></input>
    </div>
  );
};

export default NumberQ;
