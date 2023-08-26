/* eslint-disable no-useless-escape */
const urlRegex = /^https?:\/\/(www\.)?[\w\W\-]+\.[\w\-\._~\:\/\?#\[\]@!$&'%\(\)*\+,;=]{2,}#?$/i;
const engRegex = /\w/i;
const ruRegex = /[а-яё]/i;

module.exports = { urlRegex, engRegex, ruRegex };
