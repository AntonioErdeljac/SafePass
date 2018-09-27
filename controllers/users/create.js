const db = require('../../db');
const { errorMessages } = require('../../constants');

module.exports = async (req, res) => {
  try {
    if (!db.Users.isValid(req.body)) {
      return res.status(400).json({ message: errorMessages.USER_404 }).end();
    }

    const createdUser = await db.Users.create(req.body);

    return res.status(201).json(createdUser).end();
  } catch (error) {
    console.log(error);
  }
};
