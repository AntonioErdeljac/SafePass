const { paths } = require('../../constants');
const { users } = require('../../controllers');

module.exports = (router) => {
  router.post(paths.api.v1.USERS, users.create);
};