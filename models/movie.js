const mongoose = require('mongoose');
const validator = require('validator');

const urlValidation = {
  validator: (v) => validator.isURL(v),
  message: 'Некорректный URL',
};
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: urlValidation,
    },
    trailerLink: {
      type: String,
      required: true,
      validate: urlValidation,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: urlValidation,
    },
    nameRU: {
      type: String,
      required: [true, 'Введите название фильма на русском языке.'],
    },
    nameEN: {
      type: String,
      required: [true, 'Введите название фильма на английском языке.'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
