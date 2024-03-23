const mongoose = require('mongoose');

// Define schema for transaction logging
const transactionSchema = new mongoose.Schema({
  selectedStocks: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  prices: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

// Create Transaction model using the schema
const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
