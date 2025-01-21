import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  // NOTE: don't trust client-side provided data, ensure to sanatize or check the cookie before using
  // NOTE: so far, the way seems to be passing the cookie setting as a prop to the components...
  // ... Navbar -> Form  / Navbar -> Data -> Table -> Update
  // NOTE: need some kind of logic if there are no existed surveys therefore no cookies
  const [cookies] = useCookies(["selectedSurvey"]);
  console.log(cookies.selectedSurvey);

  return (
    <nav id="main-navbar" className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/form">Form</CustomLink>
        <CustomLink to="/data">Data</CustomLink>
      </ul>
    </nav>
  );
};

// this function is essentially just used to add the active class to the Link element
// of the current page. it uses react hooks to retrieve current url
function CustomLink({ to, children }: { to: any; children: any }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
