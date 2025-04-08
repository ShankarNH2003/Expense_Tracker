import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../pages/wel_Navbar.js"; // Navbar Component
import bgImage1 from "../../img/bg3.webp"; 
import bgImage2 from "../../img/bg4.webp"; 
import Footer from "./footer.js";

const Services = () => {
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
    <ServicesStyled bgImage={currentBg}>
      
      <div className="container">
      <Navbar />
        <div className="content">
          <h1>🚀 Our Services</h1>
          <p>
            Take control of your finances with our **intelligent expense tracking**,
            AI-powered insights, and **real-time financial monitoring**.
          </p>

          {/* Features Section */}
          <div className="features">
            <h2>🔹 Key Features</h2>
            <ul>
              <li>✔ Automated Expense Categorization</li>
              <li>✔ Real-time Expense Tracking</li>
              <li>✔ AI-powered Budget Insights</li>
              <li>✔ Secure Cloud Backup</li>
              <li>✔ Custom Reports & Export Options</li>
              <li>✔ Bill Reminders & Payment Alerts</li>
            </ul>
          </div>

          {/* Graphical Insights */}
          <div className="graphical">
            <h2>📊 Graphical Insights</h2>
            <p>
              Gain better financial awareness with **interactive graphs, charts, and spending trends**.
            </p>
          </div>

          {/* Security Section */}
          <div className="security">
            <h2>🔒 Security & Privacy</h2>
            <p>
              Your data is protected with **bank-level encryption**, ensuring **maximum safety**.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="why-us">
            <h2>⭐ Why Choose Us?</h2>
            <ul>
              <li>✔ Intuitive Dashboard & Modern UI</li>
              <li>✔ AI-powered Savings Recommendations</li>
              <li>✔ Easy Budget Planning & Control</li>
              <li>✔ 24/7 Support & Assistance</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </ServicesStyled>
  );
};

// Styled component for full-screen layout and improved UI
const ServicesStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${(props) => props.bgImage}) no-repeat center center/cover;
  transition: background 1.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  .container {
    flex: 1;
    width: 100%;
    height: calc(100vh - 150px); /* Exclude navbar height */
    overflow-y: auto; /* Enable scroll if content overflows */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin-top: 150px;     
  }

  .content {
    width: 100%;
    margin: auto;
    max-width: 1500px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    color: white;
  }

  .features, .graphical, .security, .why-us {
    margin-top: 2rem;
    text-align: left;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .content {
      padding: 2rem;
      width: 90%;
    }

    h1 {
      font-size: 2.2rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    p, li {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 768px) {
    .content {
      padding: 1.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.6rem;
    }

    p, li {
      font-size: 1rem;
    }
  }
`;

export default Services;
