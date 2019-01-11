'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/user');

module.exports = app => {
  app.route('/api/users')
    .get(middleware.loginRequired, controller.profile)
    .post(controller.register)
    .put(middleware.loginRequired, controller.update)
    .delete(middleware.loginRequired, controller.delete);

  app.route('/api/users/login')
    .post(controller.login);

  app.route('/api/users/logout')
    .get(controller.logout);
};

