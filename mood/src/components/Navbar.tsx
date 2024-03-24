import React from "react";

const Navbar = () => {
  return (
    <nav id="navbar" className="nav">
      <a href="/" className="site-title">
        Home
      </a>
      <ul>
        <li>
          <a href="/form">Form</a>
        </li>
        <li>Temp</li>
      </ul>
    </nav>
  );
};

export default Navbar;
