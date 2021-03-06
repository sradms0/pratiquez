'use strict';

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');

const { Schema } = mongoose;

// create user schema
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  firstName: {
    type:     String,
    trim:     true,
  },

  lastName: {
    type:     String,
    trim:     true,
  },

  email: {
    type:     String,
    trim:     true,
    unique:   [true, 'This email already exists in our system'],
    required: [true, 'An email address is required'],
    validate: {
      validator:  email => /\S+@\S+\.\S+/.test(email),
      message:    props => `${props.value} invalid email.`
    }
  },

  password: {
    type:     String,
    required: [true, 'A password is required']
  },
  courses: {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'course'
    }]
  }
});

// authenticate input against db document
UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email })
    .then(user => {
      // pass error to cb if user does not exist
      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      //compare to hashed password in db
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) return callback(null, user);
        return callback();
      });
    })
    .catch(err => callback(err));
}

// hash password before saving to db
UserSchema.pre('save', function(next) {
  const user = this;
  // only if password is created/modified
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

// create export and user model
module.exports = mongoose.model('user', UserSchema);
