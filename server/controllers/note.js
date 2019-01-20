'use strict';

const mongoose  = require('mongoose');
const Note      = require('../models/note');
const Section   = require('../models/section');
const User      = require('../models/user');

exports.allNotes = (req, res, next) => {
  // find all notes under user
  Note.find({ user: req.session.userId })    
    .populate({ path: 'section',
      populate: { path: 'course' }
    })
    .populate({ path: 'videos'})
    .populate({ path: 'images'})
    .populate({ path: 'user', select: 'email'})
    .then(note => res.json(note))
    .catch(err => next(err));
};

exports.allSectionNotes = (req, res, next) => {
  // find all notes for section
  Note.find({ section: req.params.sectionId })
    .populate({ path: 'section',
      populate: { path: 'course' }
    })
    .populate({ path: 'videos'})
    .populate({ path: 'images'})
    .then(note => res.json(note))
    .catch(err => next(err));
};

exports.singleNote = (req, res, next) => {
  Note.findById(req.params.noteId)
    .populate({ path: 'section', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(note => {
      if (!note) {
        const err = new Error(`Note with id: ${req.params.noteId} does not exist`);
        err.status = 404;
        return next(err);
      }
      return res.json(note)
    })
    .catch(err => next(err));
};

exports.registerNote = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // get section for note
      Section.findOne({ _id: req.params.sectionId })
        .then(section => {
          // make sure section exists
          if (!section) {
            const err = new Error(`Section: ${req.params.sectionId} does not exist`);
            err.status = 404;
            return next(err);
          }
          // create note, sign with user and section id
          req.body.user   = user._id;
          req.body.section = section._id;
          Note.create(req.body)
            .then(note => {
              // add note to the section
              // and save
              section.notes.push(note);
              section.save(err => {
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

exports.updateNote = (req, res, next) => {
  Note.findByIdAndUpdate(req.params.noteId, {$set: req.body})
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};

exports.deleteNote = (req, res, next) => {
  Note.findByIdAndDelete(req.params.noteId)
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};
