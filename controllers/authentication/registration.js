const db = require('../../db');
const { errorMessages, MIN_PASSWORD_LENGTH } = require('../../constants');
const { hash, tokens } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await db.Users.getByEmail(user.contact.email);

    if (existingUser) {
      return res.status(409).json({ message: errorMessages.USER_EMAIL_409 }).end();
    }

    if (!db.Users.isValid(user)) {
      return res.status(400).json({ message: errorMessages.USER_404 }).end();
    }

    if (!user.authentication.password || user.authentication.password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ message: errorMessages.USER_PASSWORD_400 }).end();
    }

    const salt = tokens.generate();
    user.authentication = {
      salt,
      hashedPassword: hash.password(salt, user.authentication.password),
    };

    const createdUser = await db.Users.create(user);

    return res.status(201).json(createdUser).end();
  } catch (error) {
    return console.log(error);
  }
};
