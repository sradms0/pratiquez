'use strict';

const middleware = require('./middleware');
const controller = require('../controllers/image');

module.exports = app => {
  app.route('/api/images/:imageId')
    .delete(middleware.loginRequired, controller.deleteImage);

  app.route('/api/notes/:noteId/images')
    .post(middleware.loginRequired, controller.registerImage);
};
