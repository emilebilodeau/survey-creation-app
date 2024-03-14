// NOTE: this is purely a test file - not to be used for project
// NOTE: third part of the initial React learning - works along side the fourth part

import { ReactNode } from "react";

interface Props {
    // children: special prop
    // this is a bit confusing: you need to look both in this file and in App.tsx
    // to see what's happening. it seems to take the child element within the Alert
    // tag in App.tsx and brings it in the HTML of the JSX below
    // ReactNode is also special: allows you to display more complex elements than strings
    children: ReactNode;
    onClose: () => void;
}

// ***why is Props destructured with curly braces instead of in an array?***
const Alert = ({children, onClose}:Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">
        {children}
        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert