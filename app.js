require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
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

app.post('/signin', signInValidation, signin);
app.post('/signup', signUpValidation, createUser);
app.use(auth);
app.post('/signout', signout);
app.use('/users', users);
app.use('/movies', movies);

mongoose.connect(DB_URL);

app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`App runs on port ${PORT}`);
});
