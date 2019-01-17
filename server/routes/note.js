'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/note');

module.exports = app => {
  app.route('/api/sections/:sectionId/notes')
    .get(middleware.loginRequired, controller.allSectionNotes)
    .post(middleware.loginRequired, controller.registerNote);

  app.route('/api/notes')
    .get(middleware.loginRequired, controller.allNotes);

  app.route('/api/notes/:noteId')
    .get(middleware.loginRequired, controller.singleNote)
    .put(middleware.loginRequired, controller.updateNote)
    .delete(middleware.loginRequired, controller.deleteNote);
};
