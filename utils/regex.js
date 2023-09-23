/* eslint-disable no-useless-escape */
const urlRegex = /^https?:\/\/(www\.)?[\w\W\-]+\.[\w\-\._~\:\/\?#\[\]@!$&'%\(\)*\+,;=]{2,}#?$/i;
const engRegex = /\w/i;
const ruRegex = /[A-Za-zа-яёА-ЯЁё]/i;

module.exports = { urlRegex, engRegex, ruRegex };
