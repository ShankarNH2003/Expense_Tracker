import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function TopNavbar() {
  const { user } = useGlobalContext();

  return (
    <NavBarStyled>
      <div className="logo">
        <img src="https://expensetrackerdemo.netlify.app/img/logo.png" alt="Logo" />
        <h1>Expense Tracker</h1>
      </div>
      <div className="profile">
        <span>👤 {user?.name || "Guest"}</span>
      </div>
    </NavBarStyled>
  );
}

const NavBarStyled = styled.nav`
  width: 100%;
  height: 60px;
  background: #1e1e2f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;

      @media (max-width: 768px) {
        font-size: 1.2rem;
      }

      @media (max-width: 480px) {
        display: none; /* Hide text on very small screens */
      }
    }
  }

  .profile {
    font-size: 1.2rem;
    font-weight: 600;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

export default TopNavbar;
