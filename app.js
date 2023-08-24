require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const error = require('./middlewares/error');
const allowedCors = require('./utils/allowedCors');

const { PORT, DB_URL } = process.env;

const app = express();

app.use(cors({ origin: allowedCors, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(router);

mongoose.connect(DB_URL);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
