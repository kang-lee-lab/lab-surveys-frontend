import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { loginWithRedirect } = useAuth0();

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
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
}

export default Header;
