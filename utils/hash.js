const crypto = require('crypto');

const SECRET = 'secret';

module.exports.authentication = (token, user) => crypto.createHmac('sha256', [token, user].join('/')).update(SECRET).digest('hex').toLowerCase();

module.exports.password = (token, password) => crypto.createHmac('sha256', [token, password].join('/')).update(SECRET).digest('hex').toLowerCase();

module.exports.encryptSecret = (secret, salt) => {
  const cipher = crypto.createCipher('aes-128-cbc', [SECRET, salt].join('/'));
  let updatedCipher = cipher.update(secret, 'utf8', 'hex');
  updatedCipher += cipher.update.final('hex');

  return updatedCipher;
};

module.exports.decryptSecret = (hashedSecret, salt) => {
  const cipher = crypto.createCipher('aes-128-cbc', [SECRET, salt].join('/'));
  let updatedCipher = cipher.update(hashedSecret, 'hex', 'utf8');
  updatedCipher += cipher.update.final('utf8');

  return updatedCipher;
};
