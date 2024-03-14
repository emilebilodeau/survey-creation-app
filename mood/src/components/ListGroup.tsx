// NOTE: this is purely a test file - not to be used for project
// NOTE: first part of the initial React learning

import { Fragment } from "react";
import { MouseEvent } from "react";

// reminder: this is considered to be a component
function ListGroup() {
  let items = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
  // items = []

  // this works but is repetitive/verbose - it is replaced by the emptyMessage const
  // if (items.length === 0){
  //   return (
  //     <>
  //       <h1>List</h1>
  //       <p>No item found</p>
  //     </>
  //   )
  // }

  // refer to notes.txt for info on ternary operator ?
  const emptyMessage = items.length === 0 ? <p>No item found</p> : null;

  // can also use function
  // advantage of it is that you can feed it arguments
  const GetMessage = () => {
    return items.length === 0 ? <p>No item found</p> : null;
  }

  // Event handler
  // if you had this within the JSX, you would not need to specify the type of event
  // it is known implicitly
  const handleClick = (event: MouseEvent)=>console.log(event);
  
  return (
    // can't return multiple elements (h1 and ul) - need to create a fragment
    // the import can be deleted and fragment element can be replaced with simply <> and </>
    <Fragment>
      <h1>List</h1>
      {/* {emptyMessage} */}
      {/* {GetMessage()} */}
      {/* this is another way to write. using emptyMessage, getMessage, or just writing it here are all valid */}
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          // this way of formatting tags is new to me...
          <li 
            className="list-group-item"
            // normally the key would an id of some kind to ensure it is unique
            key={item} 
            // onClick={()=> console.log(`${item}, ${index}`)}
            // onClick={(event) => console.log(event)}
            // this function isn't being called, we're just passing a reference
            onClick={handleClick}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
