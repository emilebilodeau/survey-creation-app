import React from "react";

interface Props {
  rows: Array<[]>;
  cols: Array<[]>;
}

// TODO: try to find a better way to generate the rows (possibly using cols)
const Table = ({ rows, cols }: Props) => {
  return (
    <table className="data-table table">
      <thead className="table-dark">
        <tr>
          {cols.map((column: any, index: any) => (
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
            <td>{String(new Date(row.timestamp))}</td>
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

export default Table;
