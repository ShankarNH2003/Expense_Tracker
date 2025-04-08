import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [khataTransactions, setKhataTransactions] = useState([]);
    // const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Set auth headers globally
    const authHeaders = {
        headers: {
            Authorization: token
        }
    };

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null; // ✅ Restore user
    });
    
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store in localStorage
    };
    
    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user"); // ✅ Clear on logout
    };
    

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
    
        if (!storedToken) {
            setUser(null);
            return;
        }
    
        setToken(storedToken);
    
        axios.get(`${BASE_URL}auth/user`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then(response => {
            console.log("✅ User session restored:", response.data.user);
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Ensure user is stored
        })
        .catch(error => {
            console.error("❌ Error fetching user:", error);
    
            if (error.response && error.response.status === 401) {
                setUser(null);
                setToken("");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        });
    }, []);
    
    
    
    // 🔹 SIGNUP API
    const signup = async (userData) => {
        try {
            console.log("Sending data:", userData); // ✅ Log userData before sending request
    
            const response = await axios.post(`${BASE_URL}auth/signup`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log("Signup Success:", response.data);
            return response.data;
        } catch (err) {
            console.error("Signup Error:", err.response?.data); // ✅ Log full error response
            setError(err.response?.data?.message || "Signup failed!");
        }
    };
    
    // 🔹 LOGIN API
    const login = async (credentials) => {
        try {
            console.log("Sending login data:", credentials);
    
            const response = await axios.post(`${BASE_URL}auth/login`, credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log("Login Success:", response.data);
            
            // Store token & update user state
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setUser(response.data.user); // ✅ Update user state
    
            return response.data;
        } catch (err) {
            console.error("Login Error:", err.response?.data);
            setError(err.response?.data?.message || "Login failed!");
        }
    };
    
    

    // 🔹 LOGOUT API
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
    };

    // 🔹 ADD INCOME (Authenticated)
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income, authHeaders);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add income");
        }
    };




    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes/${user._id}`, authHeaders);
            console.log("Fetched Incomes:", response.data); // Debugging
            setIncomes(response.data);
        } catch (error) {
            console.error("Error fetching incomes:", error);
        }
    };
    

    // 🔹 DELETE INCOME
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, authHeaders);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete income");
        }
    };

    // 🔹 TOTAL INCOME CALCULATION
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // 🔹 ADD EXPENSE
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, authHeaders);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add expense");
        }
    };

    // 🔹 GET EXPENSES
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses/${user._id}`, authHeaders);

            console.log("Fetched Expenses:", response.data); // Debugging
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };
    

    // 🔹 DELETE EXPENSE
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, authHeaders);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete expense");
        }
    };

    // 🔹 TOTAL EXPENSES CALCULATION
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // 🔹 TOTAL BALANCE
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // 🔹 TRANSACTION HISTORY (Last 3 Transactions)
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    // 🔹 ALL TRANSACTIONS HISTORY
    const transactionHistory1 = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history;
    };

    const getKhataTransactions = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`${BASE_URL}khata/get/${user._id}`, authHeaders);
            setKhataTransactions(response.data);
        } catch (error) {
            console.error("Error fetching khata transactions", error);
        }
    };
    

    // ✅ Add Khata Transaction
    const addKhataTransaction = async (transactionData) => {
        try {
            // Corrected URL to match backend route
            await axios.post(`${BASE_URL}khata/add`, transactionData, authHeaders);
            getKhataTransactions(); // Fetch updated transactions after adding
        } catch (error) {
            console.error("Error adding transaction", error);
        }
    };
    
    

    // ✅ Delete Khata Transaction
    const deleteKhataTransaction = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-khata/${id}`, authHeaders);
            getKhataTransactions();
        } catch (error) {
            console.error("Error deleting transaction", error);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                transactionHistory1,
                setError,
                signup,
                login,
                logout,
                user,
                khataTransactions, 
                getKhataTransactions, 
                addKhataTransaction, 
                deleteKhataTransaction ,
                token
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
