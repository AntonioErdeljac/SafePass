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
  },

  __v: schemaTypes.number(),
  createdAt: schemaTypes.date({ select: false }),
  updatedAt: schemaTypes.date({ select: false }),
}, { timestamps: true }));

module.exports.isValid = values => !Users.validateSync(values);
