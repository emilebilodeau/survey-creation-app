// NOTE: this contains a test component AppOld - not to be used for project


// NOTE: import and insert here any training file desired
// however, keep in mind some may fail if they required arguments
// or throw errors if they do not take arguments
import Message from './components/Message';
import ListGroup from './components/ListGroup';
import ListGroup2 from './components/ListGroup2';
import Alert from './components/Alert';

// testing/learning components
function AppOld() {
  // the following 3 variables are for ListGroup.tsx and ListGroup2.tsx
  let items = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
  let heading = 'Cities'

  // adding another additional argument to the component, still using the prop
  // this time it's a function
  const handleSelectItem = (item:string) => {
    console.log(item);
  }

  return (
    <div>
      {/*  can also use self closing syntax, <ListGroup /> */}
      {/* <ListGroup2 items={items} heading={heading} onSelectItem={handleSelectItem}></ListGroup2>; */}
      <Alert>
        Hello <span>World</span>
      </Alert>
    </div>
  )
}

export default AppOld;