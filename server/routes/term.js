'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/term');

module.exports = app => {
  app.route('/api/section/:sectionId/term')
    .get(middleware.loginRequired, controller.allTerms)
    .post(middleware.loginRequired, controller.registerTerm);

  app.route('/api/section/:sectionId/Term/:TermId')
    .get(middleware.loginRequired, controller.singleTerm)
    .put(middleware.loginRequired, controller.updateTerm)
    .delete(middleware.loginRequired, controller.deleteTerm);
};
