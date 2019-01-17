'use strict';

const mongoose  = require('mongoose');
const Video     = require('../models/video');
const Note      = require('../models/note');
const User      = require('../models/user');

exports.registerVideo = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // get note for video
      Note.findOne({ _id: req.params.noteId })
        .then(note => {
          // make sure section exists
          if (!note) {
            const err = new Error(`Note: ${req.params.noteId} does not exist`);
            err.status = 404;
            return next(err);
          }
          // create video, sign with user and note id
          req.body.user = user._id;
          req.body.note = note._id;
          Video.create(req.body)
            .then(video => {
              // add video to the note
              // and save
              note.videos.push(video);
              note.save(err => {
                if (err) return next(err); 
                 res
                  .status(201)
                  .setHeader('Location', '/');
                return res.end();
              });
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};
