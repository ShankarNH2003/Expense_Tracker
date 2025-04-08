import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const ProtectedRoute = ({ children }) => {
    const { user, loginUser, token } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            loginUser(JSON.parse(storedUser)); // ✅ Restore user session
        }
        
        setLoading(false);
    }, []);

    if (loading) return <p>Loading...</p>; // ✅ Prevent flickering

    return token && user ? children : <Navigate to="/" replace />; 
};

export default ProtectedRoute;
