const authentication = require('./authentication');
const users = require('./users');

module.exports = (router) => {
  authentication(router);
  users(router);
};
