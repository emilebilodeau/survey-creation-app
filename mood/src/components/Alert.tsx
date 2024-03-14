// NOTE: this is purely a test file - not to be used for project
// NOTE: third part of the initial React learning

import { ReactNode } from "react";

interface Props {
    // children: special prop
    // this is a bit confusing: you need to look both in this file and in App.tsx
    // to see what's happening. it seems to take the child element within the Alert
    // tag in App.tsx and brings it in the HTML of the JSX below
    children: ReactNode;
}

// ***why is Props destructured with curly braces instead of in an array?***
const Alert = ({children}:Props) => {
  return (
    <div className="alert alert-primary">{children}</div>
  )
}

export default Alert