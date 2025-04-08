import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import bgImage1 from "../../img/bg3.webp";
import bgImage2 from "../../img/bg4.webp";
import Navbar from "../pages/wel_Navbar.js"; // Fixed Import Path
import Footer from "./footer.js";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(bgImage1);

  useEffect(() => {
    const bgImages = [bgImage1, bgImage2];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % bgImages.length;
      setCurrentBg(bgImages[index]);
    }, 5000);

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <WelcomeStyled bgImage={currentBg}>
      <Navbar />
      <div className="overlay">
        <div className="content">
          <h1>Take Control of Your Finances</h1>
          <p>The easiest way to track your expenses and manage your budget.</p>
          <button className="cta-button" onClick={() => navigate("/signup")}>
            Start Tracking
          </button>
        </div>
      </div>
      <Footer/>
    </WelcomeStyled>
  );
};

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeBackground = keyframes`
  from { opacity: 0.6; }
  to { opacity: 1; }
`;

const WelcomeStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: background 1.5s ease-in-out;
  animation: ${fadeBackground} 1.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .overlay {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    animation: ${fadeIn} 1.5s ease-in-out;
  }

  .content {
    animation: ${fadeIn} 1s ease-in-out;
  }

  .content h1 {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .content p {
    font-size: 1.2rem;
    margin-top: 10px;
  }

  .cta-button {
    margin-top: 20px;
    padding: 15px 30px;
    border: none;
    background: #ffa726;
    color: white;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  .cta-button:hover {
    background: #ff9100;
    transform: scale(1.1);
  }
`;

export default Welcome;
