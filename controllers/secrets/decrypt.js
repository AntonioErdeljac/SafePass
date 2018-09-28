const db = require('../../db');
const { errorMessages } = require('../../constants');
const { hash } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSecret = await db.Secrets.findById(id)
      .select('+content.salt +content.hashedSecret');

    if (!existingSecret) {
      return res.status(400).json({ message: errorMessages.SECRET_404 }).end();
    }

    existingSecret.content = {
      hashedSecret: hash.decryptSecret(existingSecret.content.hashedSecret, existingSecret.content.salt),
    };

    return res.status(201).json(existingSecret).end();
  } catch (error) {
    return console.log(error);
  }
};
