const Movie = require('../models/movie');
const { OK, CREATED } = require('../utils/statusCodes');
const {
  movieCreateValidationErrorMessage,
  movieNotFoundErrorMessage,
  forbiddenErrorMessage,
  movieBadRequestErrorMessage,
} = require('../errors/messages');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(movieCreateValidationErrorMessage);
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundErrorMessage);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      return Movie.deleteOne({ _id: req.params.movieId });
    })
    .then((myMovie) => {
      res.status(OK).send(myMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(movieBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
