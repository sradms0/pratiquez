'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/section');

module.exports = app => {
  app.route('/api/courses/:courseId/sections')
    .get(middleware.loginRequired, controller.allSections)
    .post(middleware.loginRequired, controller.registerSection);

  app.route('/api/sections/:sectionId')
    .get(middleware.loginRequired, controller.singleSection)
    .put(middleware.loginRequired, controller.updateSection)
    .delete(middleware.loginRequired, controller.deleteSection);
};
