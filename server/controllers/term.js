'use strict';

const mongoose  = require('mongoose');
const Term      = require('../models/term');
const Section   = require('../models/section');
const User      = require('../models/user');

exports.allTerms = (req, res, next) => {
  // find all terms for section
  Term.find({ section: req.params.sectionId })
    .populate({ path: 'section', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(term => res.json(term))
    .catch(err => next(err));
};

exports.singleTerm = (req, res, next) => {
  Term.findById(req.params.termId)
    .populate({ path: 'section', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(term => {
      if (!term) {
        const err = new Error(`Term with id: ${req.params.termId} does not exist`);
        err.status = 404;
        return next(err);
      }
      return res.json(term)
    })
    .catch(err => next(err));
};

exports.registerTerm = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // get section for term
      Section.findOne({ _id: req.params.sectionId })
        .then(section => {
          // make sure section exists
          if (!section) {
            const err = new Error(`Section: ${req.params.sectionId} does not exist`);
            err.status = 404;
            return next(err);
          }
          // create term, sign with user and section id
          req.body.user   = user._id;
          req.body.section = section._id;
          Term.create(req.body)
            .then(term => {
              // add term to the section
              // and save
              section.terms.push(term);
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

exports.updateTerm = (req, res, next) => {
  Term.findByIdAndUpdate(req.params.termId, {$set: req.body})
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};

exports.deleteTerm= (req, res, next) => {
  Term.findByIdAndDelete(req.params.termId)
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};
