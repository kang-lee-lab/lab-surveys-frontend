import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/images/logos/lab-logo.webp";

function Header() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className="header">
      <a
        href={"https://www.kangleelab.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
          <img src={logo} />
      </a>
      <Link to={"/"}>Home</Link>
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
