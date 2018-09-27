module.exports.string = (options) => {
  const string = { type: String };

  return { ...string, ...options };
};

module.exports.number = (options) => {
  const number = { type: Number };

  return { ...number, ...options };
};

module.exports.date = (options) => {
  const date = { type: Date };

  return { ...date, ...options };
};
