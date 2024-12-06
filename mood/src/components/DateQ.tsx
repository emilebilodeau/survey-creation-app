import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  data: { [key: string]: string | number };
  updateData: Function;
  update: Boolean;
}

const DateQ = ({ data, updateData, update }: Props) => {
  const [startDate, setStartDate] = useState(new Date());

  // sets the date from the row as the start date
  useEffect(() => {
    if (update && data.timestamp !== undefined) {
      setStartDate(new Date(data["timestamp"]));
    }
  }, [update]);

  const handleChange = (date: any) => {
    const newValue = Date.parse(date);
    setStartDate(date);
    const newData = { ...data, timestamp: newValue };
    updateData(newData);
  };

  return (
    <div className="question">
      <p>Date</p>
      <DatePicker
        id="date-picker"
        selected={startDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateQ;
