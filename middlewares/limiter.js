const rateLimit = require('express-rate-limit');
const { limitErrorMessage } = require('../errors/messages');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: limitErrorMessage },
  standardHeaders: true,
  legacyHeaders: false,
});
