import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="mb-4">
      <h1>Bamazon</h1>

      <Link to="/" className="badge badge-primary">Home</Link>
      {" "}
      <Link to="/admin" className="badge badge-primary">Admin</Link>
    </header>
  );
};

export default Header;