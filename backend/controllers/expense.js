const Expense = require("../models/ExpenseModel");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;  // Get user ID from JWT middleware

    try {
        // Validations
        if (!title || !category || !description || !date || amount === undefined) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Create expense
        const newExpense = new Expense({
            user: userId,
            title,
            amount,
            category,
            description,
            date
        });

        const savedExpense = await newExpense.save();

        // Link expense to user
        await User.findByIdAndUpdate(userId, { $push: { expenses: savedExpense._id } });

        res.status(201).json({ message: 'Expense Added', savedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the expense first
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Remove reference from user's expenses
        await User.findByIdAndUpdate(expense.user, { $pull: { expenses: id } });

        // Delete expense
        await Expense.findByIdAndDelete(id);

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
