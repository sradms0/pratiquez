'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/term');

module.exports = app => {
  app.route('/api/terms')
    .get(middleware.loginRequired, controller.allTerms)

  app.route('/api/sections/:sectionId/terms')
    .get(middleware.loginRequired, controller.allSectionTerms)
    .post(middleware.loginRequired, controller.registerTerm);

  app.route('/api/sections/:sectionId/terms/:termId')
    .get(middleware.loginRequired, controller.singleTerm)
    .put(middleware.loginRequired, controller.updateTerm)
    .delete(middleware.loginRequired, controller.deleteTerm);
};
