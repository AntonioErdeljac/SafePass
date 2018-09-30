const _ = require('lodash');
const mongoose = require('mongoose');

const schemaTypes = require('./schemaTypes');

const { secretTypes } = require('../../constants');

const { Schema } = mongoose;

const Secrets = mongoose.model('secrets', new Schema({
  author: { ref: 'users', type: Schema.Types.ObjectId },
  content: {
    hashedSecret: schemaTypes.string({ select: false }),
    salt: schemaTypes.string({ select: false }),
  },
  email: schemaTypes.string(),
  name: schemaTypes.string({ required: true }),
  type: schemaTypes.string({ enum: _.keys(secretTypes), required: true }),

  __v: schemaTypes.number({ select: false }),
  createdAt: schemaTypes.date({ select: false }),
  updatedAt: schemaTypes.date({ select: false }),
}, { timestamps: true }));

module.exports.isValid = values => !Secrets(values).validateSync();

module.exports.create = (values) => {
  const secret = _.omit(values, ['_id']);

  return Secrets(secret).save()
    .then(createdSecret => Promise.resolve(_.omit(createdSecret.toObject(), ['content'])));
};

module.exports.findById = (id) => {
  const query = { _id: id };

  return Secrets.findOne(query);
};
