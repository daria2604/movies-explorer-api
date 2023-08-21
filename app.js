const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { createUser } = require('./controllers/users');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());

app.post('/signup', createUser);
app.use('/users', users);
app.use('/movies', movies);

mongoose.connect(DB_URL);

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});
app.listen(PORT, () => {
  console.log(`App runs on port ${PORT}`);
});
