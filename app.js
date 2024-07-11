require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('odin-wheres-waldo-backend:app');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const indexRouter = require('./routes/index');

const app = express();
const mongodb = process.env.MONGODB;

async function main() {
  await mongoose.connect(mongodb);
}

main().catch((err) => debug(err));

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

module.exports = app;
