import React from "react";

type rowPossibleValue = string | number;

interface Props {
  // both inputs are expected to be an array of objects, whose key values can vary
  rows: { [key: string]: rowPossibleValue }[];
  cols: { [key: string]: string }[];
}

const Table = ({ rows, cols }: Props) => {
  // this function leverages column names (col.Field) to index rows in order to
  // generate each cell. passed to this function is an object containing row data
  const renderRows = (row: { [key: string]: rowPossibleValue }) => {
    const rowElements: JSX.Element[] = [];
    cols.forEach((col: { [key: string]: string }) => {
      let val = row[col.Field];
      if (col.Field === "timestamp") {
        // takes the timestamp and puts it into human readable format
        let date = new Date(val);
        let options: { [key: string]: string } = {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        val = new Intl.DateTimeFormat("en-US", options).format(date);
      }
      rowElements.push(<td key={col.Field}>{val}</td>);
    });
    return rowElements;
  };

  return (
    <table className="data-table table table-striped">
      <thead className="table-header">
        <tr>
          {cols.map((column, index) => (
            <th scope="col" key={index}>
              {column.Field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>{renderRows(row)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
