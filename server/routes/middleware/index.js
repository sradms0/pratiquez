'use strict';

exports.loginRequired = (req, res, next) => {
  if (req.session && req.session.userId) return next();

  const error = new Error('You must be logged in');
  error.status = 401;
  return next(error);
};

exports.logoutRequired = (req, res, next) => {
  if (req.session.userId) {
    const error = new Error('Feature is disabled while logged in');
    error.status = 401;
    return next(error);
  }
  return next();
};
