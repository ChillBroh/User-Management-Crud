import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar">
      <ul className="home-ui">
        <li className="home-ll">
          <Link to="/login" className="">
            <h1>Login</h1>
          </Link>
        </li>
        <li className="home-ll">
          <Link to="/register" className="">
            <h1>Register</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
