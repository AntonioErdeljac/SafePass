const db = require('../../db');
const { errorMessages } = require('../../constants');
const { tokens, hash } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const secret = req.body;

    if (!db.Secrets.isValid(secret)) {
      return res.status(400).json({ message: errorMessages.SECRET_400 }).end();
    }

    const salt = tokens.generate();
    secret.content = {
      hashedSecret: hash.encryptSecret(secret.body.secret),
      salt,
    };

    const createdSecret = await db.Secrets.create(secret);

    return res.status(201).json(createdSecret).end();
  } catch (error) {
    return console.log(error);
  }
};
