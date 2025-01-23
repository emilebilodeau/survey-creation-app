import axios from "axios";
import { Link } from "react-router-dom";

type rowPossibleValue = string | number;

interface Props {
  // both inputs are expected to be an array of objects, whose key values can vary
  rows: { [key: string]: rowPossibleValue }[];
  cols: { [key: string]: string }[];
  selectedSurvey: string;
}

const Table = ({ rows, cols, selectedSurvey }: Props) => {
  const handleDelete = async (event: any) => {
    if (confirm("Are you sure you want to delete this record?")) {
      const rowId = event.target.getAttribute("row-id");

      try {
        await axios.delete(
          `http://localhost:8800/delete/${selectedSurvey}/${rowId}`
        );
        console.log(`deleted ${rowId}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

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
    rowElements.push(
      <td key={`delete-${row.id}`}>
        <button
          className="table-button"
          row-id={`${row.id}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    );
    rowElements.push(
      <td key={`edit-${row.id}`}>
        <button className="table-button">
          <Link to={"/update/" + row.id} className="general-link">
            Update
          </Link>
        </button>
      </td>
    );
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
          <th scope="col"></th>
          <th scope="col"></th>
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
