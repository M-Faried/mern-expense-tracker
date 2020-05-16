const jwt = require('jsonwebtoken');
const {
  sendSuccessData,
  sendServerError,
  sendAuthorizationDenied,
  sendInvalidMongoIDError,
} = require('../responses');

module.exports = (req, res, next) => {
  //Validating the token exists.
  const token = req.header('x-auth-token');
  if (!token) {
    sendAuthorizationDenied(res, '[Missing Token]');
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    sendAuthorizationDenied(res, '[Invalid Token]');
  }
};
