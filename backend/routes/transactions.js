const ensureAuthenticated = require('../middleware/Auth');

const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { signup, login } = require('../controllers/auth');
const { addKhataTransaction, getAllKhataTransactions, deleteKhataTransaction } = require("../controllers/KhataTransaction");

router.post("/auth/signup", signup); // Adjust route path correctly
router.post("/auth/login", login); // Adjust route path correctly

// Income Routes
router.post('/add-income', ensureAuthenticated, addIncome);
router.get('/get-incomes/:userId', ensureAuthenticated, getIncomes);
router.delete('/delete-income/:id', ensureAuthenticated, deleteIncome);

// Expense Routes
router.post('/add-expense', ensureAuthenticated, addExpense);
router.get('/get-expenses/:userId', ensureAuthenticated, getExpenses);  // Fixed function name
router.delete('/delete-expense/:id', ensureAuthenticated, deleteExpense);

// Khata Transaction Routes
router.post("/khata/add", ensureAuthenticated, addKhataTransaction);
router.get("/khata/get/:userId", ensureAuthenticated, getAllKhataTransactions);
router.delete("/khata/delete/:id", ensureAuthenticated, deleteKhataTransaction);

module.exports = router;
