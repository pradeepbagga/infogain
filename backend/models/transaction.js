const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    customerId: {
        type: Number,
        required: [true, "Customer ID is required"]
    },
    customerName: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        trim: true
    },
    createdAt: {
        type: Date,
        required: [true, "Date is required"],
    }
});

module.exports = mongoose.model('transaction',transactionSchema);