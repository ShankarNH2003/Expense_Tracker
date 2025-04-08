import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import bgImages from "../../img/bg5.webp";

const Signup = () => {
    const { signup } = useGlobalContext();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup(userData);
            console.log("Signup Successful:", response);
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error);
        }
    };

    // Stylish CSS
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: `url(${bgImages}) no-repeat center center/cover`,
            backdropFilter: "blur(5px)",
            position: "relative",
        },
        backButton: {
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(255, 255, 255, 0.3)",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background 0.3s ease",
        },
        box: {
            background: "rgba(255, 255, 255, 0.15)",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
            border: "1px solid rgba(255, 255, 255, 0.3)",
        },
        heading: {
            color: "white",
            marginBottom: "1.5rem",
            fontSize: "26px",
            fontWeight: "bold",
            textShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
        },
        input: {
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
            background: "rgba(255, 255, 255, 0.3)",
            color: "black",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        },
        button: {
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            marginTop: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        },
        buttonHover: {
            transform: "scale(1.05)",
            background: "linear-gradient(135deg, #2575fc, #6a11cb)",
        },
        loginText: {
            color: "white",
            marginTop: "15px",
            fontSize: "14px",
        },
        loginButton: {
            background: "none",
            color: "#6a11cb",
            border: "none",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "color 0.3s ease",
            textDecoration: "underline",
        },
    };

    return (
        <div style={styles.container}>
            {/* Back Button */}
            <button style={styles.backButton} onClick={() => navigate("/")}>
                ⬅ Back
            </button>

            <div style={styles.box}>
                <h2 style={styles.heading}>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.transform = styles.buttonHover.transform)}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}>
                        Sign Up
                    </button>
                </form>
                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <button onClick={() => navigate("/login")} style={styles.loginButton}>
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
