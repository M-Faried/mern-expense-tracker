const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  sendSuccessData,
  sendServerError,
  sendEmailAlreadyExists,
  sendInvalidCredentials,
} = require('../responses');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Checking the email doesn't already exist in the database.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendEmailAlreadyExists(res);
      return;
    }

    //Creating and saving the user into the database.
    const newUser = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    //Sending back the user token.
    sendUserToken(res, newUser._id);
  } catch (err) {
    sendServerError(res, err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validating the user exists.
    const user = await User.findOne({ email });
    if (!user) {
      sendInvalidCredentials(res);
      return;
    }

    //Validating the password.
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      sendInvalidCredentials(res);
      return;
    }

    //Sending back the token.
    sendUserToken(res, user._id);
  } catch (err) {
    sendServerError(res, err);
  }
};

///////////////////////////////////////////Helper Functions

const sendUserToken = (res, id) => {
  const payload = { user: { id } };
  console.log(process.env.jwtTokenExp);
  jwt.sign(
    payload,
    process.env.jwtSecret,
    { expiresIn: +process.env.jwtTokenExp },
    (err, token) => {
      if (err) throw err;
      else sendSuccessData(res, { token });
    }
  );
};
