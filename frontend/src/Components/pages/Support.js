import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../pages/wel_Navbar.js"; // Navbar Component
import bgImage1 from "../../img/bg3.webp"; 
import bgImage2 from "../../img/bg4.webp"; 
import Footer from "./footer.js";

const Support = () => {
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
    <SupportStyled bgImage={currentBg}>
      <Navbar />
      <div className="container">
        {/* Contact Information */}
        <div className="content">
          <h1>Support</h1>
          <p>
            Need help? Contact our support team or check our FAQs.
          </p>
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>📞 Helpline: <strong>+91 98765 43210</strong></p>
            <p>📧 Email: <strong>support@expensetracker.com</strong></p>
            <p>📍 Address: 123, Expense Street, Bangalore, India</p>
          </div>
        </div>

        {/* Support Form */}
        <div className="form-container">
          <h2>Need Assistance?</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Describe your issue..." rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer/>
    </SupportStyled>
  );
};

// Styled component for background animation and layout
const SupportStyled = styled.div`
  height: 100vh;
  background: url(${(props) => props.bgImage}) no-repeat center center/cover;
  transition: background 1.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem; /* Space between content and form */
    padding: 3rem 1rem;
    min-height: 100vh;
    width: 90%;
    max-width: 1200px;
  }

  .content, .form-container {
    flex: 1; /* Equal width */
    max-width: 500px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
  }

  .contact-info {
    text-align: left;
    margin-top: 1rem;
  }

  .contact-info p {
    font-size: 1.1rem;
    color: #fff;
  }

  .form-container h2 {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
  }

  input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  button {
    background: #f39c12;
    color: white;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #d35400;
  }
`;

export default Support;
