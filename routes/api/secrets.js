const { paths } = require('../../constants');
const { authenticate } = require('../middlewares');
const { secrets } = require('../../controllers');

module.exports = (router) => {
  router.post(paths.api.v1.SECRETS, authenticate, secrets.create);

  router.get(paths.api.v1.SECRETS_ID_DECRYPT, authenticate, secrets.decrypt);
};
