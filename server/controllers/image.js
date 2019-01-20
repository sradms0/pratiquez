'use strict';

const mongoose  = require('mongoose');
const Image     = require('../models/image');
const Note      = require('../models/note');
const User      = require('../models/user');

exports.registerImage = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // get note for image
      Note.findOne({ _id: req.params.noteId })
        .then(note => {
          // make sure note exists
          if (!note) {
            const err = new Error(`Note: ${req.params.noteId} does not exist`);
            err.status = 404;
            return next(err);
          }
          // create image, sign with user and note id
          req.body.user = user._id;
          req.body.note = note._id;
          Image.create(req.body)
            .then(image => {
              // add image to the note
              // and save
              note.images.push(image);
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

exports.deleteImage = (req, res, next) => {
  Image.findByIdAndDelete(req.params.imageId)
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
}
