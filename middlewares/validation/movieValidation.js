const { celebrate, Joi } = require('celebrate');
const { urlRegex, engRegex, ruRegex } = require('../../utils/regex');

const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required().pattern(ruRegex),
    nameEN: Joi.string().required().pattern(engRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  postMovieValidation,
};
