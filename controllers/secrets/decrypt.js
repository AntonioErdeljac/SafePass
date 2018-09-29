const db = require('../../db');
const { errorMessages } = require('../../constants');
const { hash } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { user } = req.identity;
    const { id } = req.params;

    const existingSecret = await db.Secrets.findById(id)
      .select('+content.salt +content.hashedSecret');

    if (!existingSecret) {
      return res.status(400).json({ message: errorMessages.SECRET_404 }).end();
    }

    if (existingSecret.author.toString() !== user._id.toString()) {
      return res.status(403).json({ message: errorMessages.SECRET_403 }).end();
    }

    existingSecret.content = {
      hashedSecret: hash.decryptSecret(existingSecret.content.hashedSecret, [existingSecret.content.salt, user.authentication.salt].join('')),
    };

    return res.status(201).json(existingSecret).end();
  } catch (error) {
    return console.log(error);
  }
};
