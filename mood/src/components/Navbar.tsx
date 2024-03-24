import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="navbar" className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <li>
          <Link to="/form">Form</Link>
        </li>
        <li>
          <Link to="/data">Data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
