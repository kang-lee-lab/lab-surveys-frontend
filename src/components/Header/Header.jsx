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
          <img className="logo" src={logo} />
      </a>
      <Link to={"/"}><h3>Home</h3></Link>
      <Link to={"/participate"}><h3>Participate</h3></Link>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}><h3>Log In</h3></button>
      )}
      {isAuthenticated && (
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <h3>Log Out</h3>
        </button>
      )}
    </div>
  );
}

export default Header;
