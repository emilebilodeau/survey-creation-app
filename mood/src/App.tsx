// NOTE: this contains a test component AppOld - not to be used for project


// NOTE: import and insert here any training file desired
// however, keep in mind some may fail if they required arguments
// or throw errors if they do not take arguments
import Message from './components/Message';
import ListGroup from './components/ListGroup';
import ListGroup2 from './components/ListGroup2';
import Alert from './components/Alert';
import Button from './components/Button';

import { useState } from 'react';

// testing/learning component
function AppOld() {
  // the following 3 variables are for ListGroup.tsx and ListGroup2.tsx
  let items = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
  let heading = 'Cities'

  // adding another additional argument to the component, still using the prop
  // this time it's a function
  const handleSelectItem = (item:string) => {
    console.log(item);
  }

  // for the Alert/Button combo
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {/*  can also use self closing syntax, <ListGroup /> */}
      {/* <ListGroup2 items={items} heading={heading} onSelectItem={handleSelectItem}></ListGroup2>; */}
      {/* 
      below <Alert> shows the use of ReactNode
      <Alert>
        Hello <span>World</span>
      </Alert>
      */}
      {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>}
      <Button onClick={() => setAlertVisibility(true)}>My Button</Button>
    </div>
  )
}

export default AppOld;