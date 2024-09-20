require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const indexRouter = require('./routes/index');

const app = express();

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.json(response);
});

module.exports = app;
