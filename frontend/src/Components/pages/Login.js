import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import bgImages from "../../img/bg4.webp";

const Login = () => {
    const { login } = useGlobalContext();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            console.log("Login Successful:", response);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: `url(${bgImages}) no-repeat center center/cover`,
            position: "relative",
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
        backButton: {
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px 15px",
            background: "#ff4b4b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s ease",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        },
    };

    return (
        <div style={styles.container}>
            {/* Back to Welcome Button at the Top-Left Corner */}
            <button style={styles.backButton} onClick={() => navigate("/")}>
                &larr; Welcome
            </button>

            <div style={styles.box}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
