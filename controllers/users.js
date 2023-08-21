const bcrypt = require('bcrypt');
const User = require('../models/user');
const { OK, CREATED, CONFLICT } = require('../utils/statusCodes');
const {
  userNotFoundErrorMessage,
  userBadRequestErrorMessage,
  userUpdateValidationErrorMessage,
  userCreateValidationErrorMessage,
  conflictErrorMessage,
} = require('../errors/messages');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const options = {
  new: true,
  runValidators: true,
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.status(OK).send({ user });
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(userUpdateValidationErrorMessage));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        res.status(CREATED).send({
          email: user.email,
          name: user.name,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(userCreateValidationErrorMessage));
          return;
        }
        if (err.code === CONFLICT) {
          next(new ConflictError(conflictErrorMessage));
          return;
        }
        next(err);
      });
  });
};

module.exports = {
  getUser,
  updateUser,
  createUser,
};
