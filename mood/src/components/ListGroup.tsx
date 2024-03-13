import { Fragment } from "react";

function ListGroup() {
  return (
    // can't return multiple elements - need to create a fragment
    // the import can be deleted and fragment element can be replaced with simply <> and </>
    <Fragment>
      <h1>List</h1>
      <ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
    </Fragment>
  );
}

export default ListGroup;
