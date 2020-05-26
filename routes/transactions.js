const express = require('express');
const authentication = require('../middleware/authentication');
const controller = require('../controllers/transactionsCtrl');
const { check } = require('express-validator');
const { checkValidationErrors, sendInvalidTransID } = require('../responses');

const router = express.Router();

// @desc    Get all transactions of a user
// @route   GET /api/transactions
// @access  Private
router.get('/', authentication, (req, res) => {
  controller.getTransactions(req, res);
});

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
const addTransValidations = [
  check('label', 'Label is required!').not().isEmpty(),
  check('amount', 'Amount is required!').not().isEmpty().isInt(),
];
router.post('/', [authentication, addTransValidations], (req, res) => {
  if (checkValidationErrors(req, res)) return;
  controller.addTransaction(req, res);
});

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
router.delete('/:id', authentication, (req, res) => {
  if (!isValidMongoID(req.params.id)) {
    sendInvalidTransID(res);
    return;
  }
  controller.deleteTransaction(req, res);
});

const isValidMongoID = (id) => id.match(/^[0-9a-fA-F]{24}$/);

module.exports = router;
