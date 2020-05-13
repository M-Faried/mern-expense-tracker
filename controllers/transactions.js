const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  const { label, amount } = req.body;

  try {
    //Creating the new transaction.
    const transaction = new Transaction(req.body);
    await transaction.save();

    //Returning the response.
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      //Getting the validation errors of the schema.
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      // Sending the generic server error in this case.
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    //Handeling the case of an invalid ID
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Invalid transaction ID',
      });
    }

    //Deleting the transaction.
    await transaction.remove();

    //Returning the response.
    return res.status(200).json({
      success: true,
      delTransaction: transaction,
    });
  } catch (err) {
    // Sending the generic server error in this case.
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
