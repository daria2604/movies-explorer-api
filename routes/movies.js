const router = require('express').Router();

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const { postMovieValidation } = require('../middlewares/validation/movieValidation');

router.get('/', getMovies);
router.post('/', postMovieValidation, postMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
