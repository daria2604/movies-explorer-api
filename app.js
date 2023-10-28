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
const { ALLOWED_CORS, PORT, DB_URL } = require('./utils/constants');

const app = express();

app.use(cors({ origin: ALLOWED_CORS, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.set('trust proxy', 1);
app.get('/x-forwarded-for', (req, res) => res.send(req.headers['x-forwarded-for']));

app.use(router);

mongoose.connect(DB_URL);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
