import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const Data = ({ selectedSurvey }: { selectedSurvey: string }) => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const fetchData = async () => {
    try {
      const r = await axios.get(
        "http://localhost:8800/getdata/" + selectedSurvey
      );
      const c = await axios.get(
        "http://localhost:8800/getcol/" + selectedSurvey
      );
      setRows(r.data);
      setCols(c.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(rows);
  console.log(cols);

  return <Table rows={rows} cols={cols} selectedSurvey={selectedSurvey} />;
};

export default Data;
