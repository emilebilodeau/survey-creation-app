import React, { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const fetchData = async () => {
    try {
      const r = await axios.get("http://localhost:8800/getdata");
      const c = await axios.get("http://localhost:8800/getcol");
      setRows(r.data);
      setCols(c.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // TODO: create a component for the table after, passing the data as a prop. also
  // try to see if there is a better way of generating the rows
  return (
    <table className="data-table table">
      <thead className="table-dark">
        <tr>
          {cols.map((column: any, index) => (
            <th scope="col" key={index}>
              {column.Field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.timestamp}</td>
            <td>{row.mood}</td>
            <td>{row.sleepDisruption}</td>
            <td>{row.exercise}</td>
            <td>{row.outisde}</td>
            <td>{row.meditation}</td>
            <td>{row.breakRoutine}</td>
            <td>{row.socialInteraction}</td>
            <td>{row.rumination}</td>
            <td>{row.drank}</td>
            <td>{row.extra}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Data;
