require("dotenv").config();
const KhataTransaction = require("../models/KhataTransactionModel");
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Add a new Khata transaction with SMS notification
exports.addKhataTransaction = async (req, res) => {
    try {
        const { mobile, name, transactionType, amount, date, details } = req.body;

        // Ensure that the 'name' field is provided in the request body
        if (!name) {
            return res.status(400).json({ error: "'name' field is required" });
        }

        const newTransaction = new KhataTransaction({
            user: req.user.id,
            mobile,
            name, // Adding the name field
            transactionType,
            amount,
            date,
            details,
        });

        await newTransaction.save();

        // Send SMS notification
        const message = `Transaction Alert: ${name}, You ${transactionType} ₹${amount} on ${date}. Details: ${details}`;
        
        try {
            await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobile,
            }).then(msg => console.log("SMS Sent:", msg.sid))
            .catch(err => console.error("Twilio Error:", err));

            res.status(201).json({ message: "Transaction added and SMS sent successfully", transaction: newTransaction });

        } catch (smsError) {
            console.error("Twilio Error:", smsError);
            res.status(201).json({ error: "Transaction added, but SMS failed", details: smsError.message });
        }

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all transactions for a user
exports.getAllKhataTransactions = async (req, res) => {
    try {
        const transactions = await KhataTransaction.find({ user: req.params.userId });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a transaction
exports.deleteKhataTransaction = async (req, res) => {
    try {
        const transaction = await KhataTransaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        if (transaction.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        await transaction.remove();
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
