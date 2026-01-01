import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../LoginModal/LoginModal";
import logo from "../../assets/images/logos/lab-logo.webp";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="header">
      <a
        href={"https://www.kangleelab.com/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="logo" src={logo} alt="Lab Logo" />
      </a>
      <Link to={"/"}>Home</Link>
      <Link to={"/participate"}>Participate</Link>
      {!isAuthenticated && (
        <button onClick={() => setIsLoginModalOpen(true)}>Log In</button>
      )}
      {isAuthenticated && (
        <button onClick={logout}>Log Out</button>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

export default Header;
