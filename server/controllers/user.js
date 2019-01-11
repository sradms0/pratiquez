'use strict';

const mongoose  = require('mongoose');
const User      = require('../models/user');

exports.register = (req, res, next) => {
  if (req.body) {
    // confirm user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }

    // create object with form input
    const userData = {
      email:      req.body.email,
      firstName:  req.body.firstName,
      lastName:   req.body.lastName,
      password:   req.body.password
    };
    // use schema's `create` method to insert document into Mongo
    User.create(userData)
      .then(() => {
        res
          .status(201)
          .setHeader('Location', '/');
        return res.end();
      })
      .catch(err => {
        err.status = 400;
        return next(err);
      });
    
  } else {
      const err = new Error('All fields required');
      err.status = 400;
      return next(err);
  }
};

exports.login = (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }
      req.session.userId = user._id;
      return this.profile(req, res, next);
    });
  }
};

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
      return res.end();
    });
  }
};

exports.profile = (req, res, next) => {
  User.findById(req.session.userId, {__v: false, password: false})
    .populate({ 
      path: 'courses', select: 'sections',
      populate: { path: 'sections' }
    })
    .then(user => res.json(user))
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.session.userId, {$set: req.body})
    .then(() => res.status(204).end())
    .catch(err => {
      err.status = 400;
      return next(err);
    });
};

exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.session.userId)
    .then(() => {
      req.session.destroy(err => {
        if (err) return next(err);
        res.status(204);
        return res.end();
      });
    })
  .catch(err => { 
    err.status = 400;
    return next(err); 
  });
};
