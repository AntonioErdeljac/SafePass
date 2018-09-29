const db = require('../../db');
const { build } = require('../../utils');
const { cookies } = require('../../constants');

module.exports = async (req, res, next) => {
  try {
    if (!req.cookies[cookies.AUTHENTICATION]) {
      return res.status(401).end();
    }

    const user = await db.Users.getBySessionToken(req.cookies[cookies.AUTHENTICATION])
      .select('+authentication.salt')
      .lean();

    if (!user) {
      res.clearCookie(cookies.AUTHENTICATION, build.cookieOptions());

      if (req.path.indexOf('/api/') === 0) {
        return res.status(401).end();
      }
    }

    req.identity = { user };

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
