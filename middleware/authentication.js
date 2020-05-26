const jwt = require('jsonwebtoken');
const { sendAuthorizationDenied } = require('../responses');

module.exports = (req, res, next) => {
  //Validating the token exists.
  const token = req.header('x-auth-token');
  if (!token) {
    sendAuthorizationDenied(res, '[Missing Token]');
    return;
  }

  //Verifying the token value.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    sendAuthorizationDenied(res, '[Invalid Token]');
  }
};
