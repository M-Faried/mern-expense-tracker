const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');

const transactionsRouter = require('./routes/transactions');
const userRouter = require('./routes/user');
const connectDB = require('./config/db');

const app = express();
dotenv.config({ path: './config/config.env' });

//Connecting to the database.
connectDB();

// Adding json body parser
app.use(express.json()); //To allow us to use the body parts

// Redirecting http calls to https.
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    // request was via https, so do no special handling
    return next();
  } else {
    // request was via http, so redirect to https
    const redirUrl = `https://${req.headers.host}${req.url}`;
    return res.redirect(redirUrl);
  }
});

// Adding morgan logger only when we are in the development environment
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Adding the api router end points.
app.use('/api/user', userRouter);
app.use('/api/transactions', transactionsRouter);

// Adding the client layer to the middle ware. This has to come after the api is added.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

//Start listening on the port 5000
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port number ${PORT}`
      .yellow.bold.underline
  )
);
