import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import logo from "../../img/logo123.png"; // Ensure the correct path

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavStyled>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <p>ExpenseTracker</p>
      </div>

      {/* Menu Items */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
      </div>

      {/* Buttons for login/signup */}
      <div className={`buttons ${menuOpen ? "active" : ""}`}>
        <button className="login" onClick={() => { navigate("/login"); setMenuOpen(false); }}>
          Login
        </button>
        <button className="get-started" onClick={() => { navigate("/signup"); setMenuOpen(false); }}>
          Get Started
        </button>
      </div>

      {/* Hamburger Menu Button */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
  }

  .logo-img {
    width: 90px;
    height: auto;
    margin-right: 10px;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .nav-links a:hover {
    color: #ffa726;
    transform: scale(1.1);
  }

  .buttons {
    display: flex;
    gap: 15px;
  }

  .login,
  .get-started {
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  .login {
    background: transparent;
    color: white;
    border: 2px solid white;
  }

  .login:hover {
    background: white;
    color: black;
  }

  .get-started {
    background: #ffa726;
    color: white;
    border: none;
  }

  .get-started:hover {
    background: #ff9100;
  }

  /* Hamburger Menu Styling */
  .menu-toggle {
    display: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 10px 20px;

    .nav-links,
    .buttons {
      position: absolute;
      top: 60px;
      right: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      padding: 20px 0;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      visibility: hidden;
    }

    .nav-links.active,
    .buttons.active {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      overflow: hidden;
    }

    .menu-toggle {
      display: block;
    }
  }
`;

export default Navbar;
