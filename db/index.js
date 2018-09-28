const models = require('./models');
const mongoose = require('./mongoose');

module.exports.mongoose = mongoose;

module.exports.Secrets = models.secrets;
module.exports.Users = models.users;
