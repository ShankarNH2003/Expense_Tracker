const Income = require("../models/IncomeModel");
const User = require("../models/User");

exports.addIncome = async (req, res) => {
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

        // Create income
        const newIncome = new Income({
            user: userId,
            title,
            amount,
            category,
            description,
            date
        });

        const savedIncome = await newIncome.save();

        // Link income to user
        await User.findByIdAndUpdate(userId, { $push: { incomes: savedIncome._id } });

        res.status(201).json({ message: 'Income Added', savedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the income first
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Remove reference from user's incomes
        await User.findByIdAndUpdate(income.user, { $pull: { incomes: id } });

        // Delete income
        await Income.findByIdAndDelete(id);

        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
