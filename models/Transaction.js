const mongoose = require('mongoose');

//The schema of the data base objects
const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  label: {
    type: String,
    trim: true,
    required: [true, 'Transaction text can NOT be empty'],
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount can NOT be empty'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
