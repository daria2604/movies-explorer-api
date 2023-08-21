const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());

mongoose.connect(DB_URL);

app.listen(PORT, () => {
  console.log(`App runs on port ${PORT}`);
});
