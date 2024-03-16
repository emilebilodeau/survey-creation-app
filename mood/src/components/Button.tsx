// NOTE: this is purely a test file - not to be used for project
// NOTE: fourth part of the initial React learning


// the ? after an argument tells TypeScript that this arg is optional
interface Props {
    children: string;
    // color will only accept this 3 values
    color?: 'primary' | 'secondary' | 'danger';
    onClick: () => void;
}

// can add default values to the Props, as seen for color
const Button = ({children, color = 'primary', onClick}: Props) => {
  return (
    <button className={'btn btn-' + color} onClick={onClick}>{children}</button>
  )
}

export default Button