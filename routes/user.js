const express = require('express');
const { check } = require('express-validator');
const { checkValidationErrors } = require('../responses');
const controller = require('../controllers/userCtrl');

const router = express.Router();

// @route   /api/user/register
// @desc    Creates a new user into the data base and returns its session token.
// @access  Public
const registerChecks = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'A valid email is required').isEmail(),
  check(
    'password',
    'A password with 6 characters of more is required'
  ).isLength({ min: 6 }),
];
router.post('/register', registerChecks, (req, res) => {
  if (checkValidationErrors(req, res)) return;
  controller.register(req, res);
});

// @route   /api/user/login
// @desc    Creates the user token if the credentials are valid.
// @access  Public
const loginChecks = [
  check('email', 'A valid email is required').isEmail(),
  check('password', 'Please enter your password').not().isEmpty(),
];
router.post('/login', loginChecks, (req, res) => {
  if (checkValidationErrors(req, res)) return;
  controller.login(req, res);
});

module.exports = router;
