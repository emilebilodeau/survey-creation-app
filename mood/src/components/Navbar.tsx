import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="main-navbar" className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/form">Form</CustomLink>
        <CustomLink to="/data">Data</CustomLink>
        <CustomLink to="/practice">Practice</CustomLink>
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
