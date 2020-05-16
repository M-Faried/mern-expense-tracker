const { validationResult } = require('express-validator');

exports.sendSuccessData = (res, data) => {
  res.json({
    success: true,
    ...data,
  });
};

exports.checkValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return true;
  }
  return false;
};

exports.sendInvalidTransID = (res) => {
  res.status(404).json({
    success: false,
    error: 'Invalid Transaction ID!',
  });
};

exports.sendAuthorizationDenied = (res, msg) => {
  res.status(401).json({
    success: false,
    error: 'Authorization Denied! ' + msg,
  });
};

exports.sendServerError = (res, err) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error!',
  });
};

exports.sendEmailAlreadyExists = (res) => {
  res.status(400).json({
    success: false,
    error: 'Email Already Exists!',
  });
};

exports.sendInvalidCredentials = (res) => {
  res.status(400).json({
    success: false,
    error: 'Invalid Credentials!',
  });
};
