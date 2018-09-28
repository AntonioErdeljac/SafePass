const cookies = require('./cookies');
const errorMessages = require('./errorMessages');
const paths = require('./paths');
const secretTypes = require('./secretTypes');

module.exports.cookies = cookies;
module.exports.errorMessages = errorMessages;
module.exports.paths = paths;
module.exports.secretTypes = secretTypes;

module.exports.MIN_PASSWORD_LENGTH = 6;
