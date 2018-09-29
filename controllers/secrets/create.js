const db = require('../../db');
const { errorMessages } = require('../../constants');
const { tokens, hash } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const secret = req.body;
    const { user } = req.identity;

    if (!db.Secrets.isValid(secret)) {
      return res.status(400).json({ message: errorMessages.SECRET_400 }).end();
    }

    secret.author = user._id;

    const salt = tokens.generate();
    secret.content = {
      hashedSecret: hash.encryptSecret(secret.content.secret, [salt, user.authentication.salt].join('')),
      salt,
    };

    const createdSecret = await db.Secrets.create(secret);

    return res.status(201).json(createdSecret).end();
  } catch (error) {
    return console.log(error);
  }
};
