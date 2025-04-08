import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../pages/wel_Navbar.js"; // Fixed Import Path
import bgImage1 from "../../img/bg3.webp"; 
import bgImage2 from "../../img/bg4.webp"; 
import Footer from "./footer.js";

const Features = () => {
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

  // Styles for the About page
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      padding: "3rem 1rem",
      minHeight: "100vh",
    },
    content: {
      maxWidth: "600px",
      background: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      marginTop: "2rem",
    },
    title: {
      color: "#2c3e50",
      marginBottom: "1rem",
    },
    paragraph: {
      color: "#7f8c8d",
      fontSize: "1.1rem",
      lineHeight: "1.6",
    },
  };

  return (
    <AboutStyled bgImage={currentBg}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>Our Features</h1>
          <p style={styles.paragraph}>
          Track expenses, set budgets, and analyze spending habits with ease.
          </p>
        </div>
      </div>
      <Footer/>
    </AboutStyled>
  );
};

// Styled component for background animation
const AboutStyled = styled.div`
  height: 100vh;
  background: url(${(props) => props.bgImage}) no-repeat center center/cover;
  transition: background 1.5s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;


export default Features;