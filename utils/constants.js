const ALLOWED_CORS = [
  'http://localhost:4001',
  'https://movies.dvr.nomoredomainsicu.ru',
  'https://dvr-movie-explorer.netlify.app',
];
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = { ALLOWED_CORS, PORT, DB_URL };
