const { authentication } = require('../../controllers');
const { paths } = require('../../constants');

module.exports = (router) => {
  router.post(paths.api.v1.AUTHENTICATION_REGISTRATION, authentication.registration);

  router.post(paths.api.v1.AUTHENTICATION_LOGIN, authentication.login);
};
