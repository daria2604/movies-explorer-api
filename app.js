require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { createUser, signin, signout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { signInValidation, signUpValidation } = require('./middlewares/validation/userValidation');

const { PORT, DB_URL } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', signInValidation, signin);
app.post('/signup', signUpValidation, createUser);
app.use(auth);
app.use('/users', users);
app.use('/movies', movies);
app.post('/signout', signout);

mongoose.connect(DB_URL);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
