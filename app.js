/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use('/', indexRouter);

app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  const response = {
    error: {
      message: err.message,
      status: err.status || 500,
      stack: err.stack,
    },
  };

  console.error(response);
  return res.json(response);
});

app.listen(PORT, () =>
  console.log(`Shopping Cart - listening on port ${PORT}!`),
);
