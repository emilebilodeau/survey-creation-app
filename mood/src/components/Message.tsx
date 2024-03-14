// NOTE: this is purely a test file - not to be used for project

// PascalCasing 
// NOTE: this is a function component, which has become more popular recently...
// NOTE: the older way of doing it uses class components
function Message () {
    // JSX: JavaScript XML - refer to TypeScript in notes.txt for more info
    const name = 'Emile';
    return <h1>Hello {name}</h1>;
}

export default Message;