import Message from './components/Message';
import ListGroup from './components/ListGroup';
import ListGroup2 from './components/ListGroup2';

function App() {
  let items = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
  let heading = 'Cities'

  // can also use self closing syntax, <ListGroup />
  // NOTE: import and insert here the ListGroup{num} learning file desired
  // however, some ListGroup may fail/show errors if they take no arguments
  return (
    <div>
      <ListGroup2 items={items} heading={heading}></ListGroup2>;
    </div>
  )
}

export default App;