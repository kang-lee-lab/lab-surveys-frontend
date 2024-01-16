import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      )}
    </div>
  );
}

export default Header;
