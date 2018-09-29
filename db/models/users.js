const _ = require('lodash');
const mongoose = require('mongoose');

const schemaTypes = require('./schemaTypes');

const { Schema } = mongoose;

const Users = mongoose.model('users', new Schema({
  personal: {
    firstName: schemaTypes.string({ required: true }),
    lastName: schemaTypes.string({ required: true }),
  },
  authentication: {
    hashedPassword: schemaTypes.string({ select: false }),
    salt: schemaTypes.string({ select: false }),
    sessionToken: schemaTypes.string({ select: false }),
  },
  contact: {
    email: schemaTypes.string({ required: true }),
  },

  __v: schemaTypes.number({ select: false }),
  createdAt: schemaTypes.date({ select: false }),
  updatedAt: schemaTypes.date({ select: false }),
}, { timestamps: true }));

module.exports.isValid = values => !Users(values).validateSync();

module.exports.create = (values) => {
  const user = _.omit(values, ['_id']);

  return Users(user).save()
    .then(createdUser => Promise.resolve(_.omit(createdUser.toObject(), ['authentication'])));
};

module.exports.getByEmail = (email) => {
  const query = { 'contact.email': new RegExp(`^${_.escapeRegExp(_.trim(email))}$`, 'i') };

  return Users.findOne(query);
};

module.exports.getBySessionToken = (token) => {
  const query = { 'authentication.sessionToken': token };

  return Users.findOne(query);
};
