const _ = require('lodash');

const db = require('../../db');
const { errorMessages, cookies } = require('../../constants');
const { hash, tokens, build } = require('../../utils');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    const existingUser = await db.Users.getByEmail(email)
      .select('+authentication.hashedPassword +authentication.salt');

    if (!existingUser) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    if (existingUser.authentication.hashedPassword !== hash.password(existingUser.authentication.salt, password)) {
      return res.status(400).json({ message: errorMessages.LOGIN_400 }).end();
    }

    existingUser.authentication.sessionToken = hash.authentication(tokens.generate(), existingUser._id);

    res.cookie(cookies.AUTHENTICATION, existingUser.authentication.sessionToken, build.cookieOptions());

    await existingUser.save();

    return res.status(200).json(_.omit(existingUser.toObject(), ['authentication'])).end();
  } catch (error) {
    return console.log(error);
  }
};
