'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/course');

module.exports = app => {
  app.route('/api/courses')
    .get(middleware.loginRequired, controller.allCourses)
    .post(middleware.loginRequired, controller.registerCourse);

  app.route('/api/courses/:courseId')
    .get(middleware.loginRequired, controller.singleCourse)
    .put(middleware.loginRequired, controller.updateCourse)
    .delete(middleware.loginRequired, controller.deleteCourse);
};
