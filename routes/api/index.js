const authentication = require('./authentication');
const secrets = require('./secrets');
const users = require('./users');

module.exports = (router) => {
  authentication(router);
  secrets(router);
  users(router);
};
