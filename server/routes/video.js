'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/video');

module.exports = app => {
  app.route('/api/notes/:noteId/videos')
    .post(middleware.loginRequired, controller.registerVideo);
};
