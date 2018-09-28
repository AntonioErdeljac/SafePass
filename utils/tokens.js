module.exports.generate = (size = 10) => {
  let token = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < size; i += 1) {
    token += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return token;
};
