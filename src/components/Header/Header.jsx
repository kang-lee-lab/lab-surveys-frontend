import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h3>Kang Lee Lab Surveys</h3>
      <Link to={"/"}>Home</Link>
      <a
        href={"https://www.kangleelab.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lab Website
      </a>
      <Link to={"/participate"}>Participate</Link>
    </div>
  );
}

export default Header;
