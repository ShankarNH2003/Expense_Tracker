const mongoose = require('mongoose');

const KhataTransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true  // Make this field required, or set it to false if optional
    },
    transactionType: {
        type: String,
        enum: ["Gave", "Received"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    details: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('KhataTransaction', KhataTransactionSchema);
