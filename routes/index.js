const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { createUser, signin, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signInValidation, signUpValidation } = require('../middlewares/validation/userValidation');
const NotFoundError = require('../errors/NotFoundError');
const { pageNotFoundErrorMessage } = require('../errors/messages');

router.post('/signin', signInValidation, signin);
router.post('/signup', signUpValidation, createUser);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', signout);
router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundErrorMessage));
});

module.exports = router;
