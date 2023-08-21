const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { authenticationErrorMessage } = require('../errors/messages');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: [true, 'Пользователь с таким email уже существует.'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный email или пароль',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(authenticationErrorMessage);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(authenticationErrorMessage);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
