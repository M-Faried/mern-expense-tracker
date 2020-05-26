const Transaction = require('../models/Transaction');
const {
  sendSuccessData,
  sendServerError,
  sendAuthorizationDenied,
  sendInvalidTransID,
} = require('../responses');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    sendSuccessData(res, { count: transactions.length, data: transactions });
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.addTransaction = async (req, res) => {
  const { label, amount } = req.body;

  try {
    //Creating the new transaction.
    const transaction = new Transaction({ user: req.user.id, label, amount });

    //Saving the transaction to database.
    await transaction.save();

    //Returning the response.
    sendSuccessData(res, { addedTransaction: transaction });
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    //Handeling the case of non existent transaction ID
    if (!transaction) {
      sendInvalidTransID(res);
      return;
    }

    //Validating the transaction belongs to the current user.
    if (transaction.user.toString() !== req.user.id) {
      sendAuthorizationDenied(res, '[Invalid Owner]');
      return;
    }

    //Deleting the transaction.
    await transaction.remove();

    //Returning the response.
    sendSuccessData(res, { deletedTransaction: transaction });
  } catch (err) {
    // Sending the generic server error in this case.
    sendServerError(res, err);
  }
};
