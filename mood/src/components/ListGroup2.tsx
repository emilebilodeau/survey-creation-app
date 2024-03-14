// NOTE: this is purely a test file - not to be used for project
// NOTE: second part of the initial React learning

import { useState } from "react";

// want to be able to pass to the component argument(s) such as the following object
// {items: [], heading: string}
// can use an interface, which is TypeScript specific
// ***unsure on the implication of interface; it has to live outside the func?***
interface Props {
    // this defines the type of items as an array of strings
    items: string[];
    heading: string;
}

// the Props "interface" here is destructured. otherwises, in the fragement, 
// items would to be accessed the following way: props.items
function ListGroup2({items, heading}:Props) {
  
  
  // IMPORTANT
  // Hook -> it's a function that allows up to tap in to built in features in React

  // for example, using the useState hook we can tell React that this component can 
  // have data or states that change over time. there are multiple hooks available
  // ***unsure what is the -1 being initially passed to this hook***
  // each component have their own states
  let arr = useState(-1);
  // this array will have 2 elements:
  arr[0] // variable (selectedIndex)
  arr[1] // updater function (setSelectedIndex)

  // however we will use destructuring
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li 
            className={
                selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
            }
            key={item} 
            onClick={() => {setSelectedIndex(index)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup2;