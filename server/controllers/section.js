'use strict';

const mongoose  = require('mongoose');
const Section   = require('../models/section');
const Course    = require('../models/course');
const User      = require('../models/user');

exports.allSections = (req, res, next) => {
  // get all sections under user
  Section.find({ user: req.session.userId })
    .populate({ path: 'course', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(courses => res.json(courses))
    .catch(err => next(err));
};

exports.allCourseSections= (req, res, next) => {
  // find all sections for course
  Section.find({ course: req.params.courseId })
    .populate({ path: 'course', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(courses => res.json(courses))
    .catch(err => next(err));
};

exports.singleSection = (req, res, next) => {
  Section.findById(req.params.sectionId)
    .populate({ path: 'course', select: 'title'})
    .populate({ path: 'user', select: 'email'})
    .then(section => {
      if (!section) {
        const err = new Error(`Section with id: ${req.params.sectionId} does not exist`);
        err.status = 404;
        return next(err);
      }
      return res.json(section)
    })
    .catch(err => next(err));
};

exports.registerSection = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // get course for section
      Course.findOne({ _id: req.params.courseId })
        .then(course => {
          // make sure course exists
          if (!course) {
            const err = new Error(`${req.params.courseId} does not exist`);
            err.status = 404;
            return next(err);
          }
          // create section, sign with user and course id
          req.body.user   = user._id;
          req.body.course = course._id;
          Section.create(req.body)
            .then(section => {
              // add section to the course
              // and save
              course.sections.push(section);
              course.save(err => {
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

exports.updateSection = (req, res, next) => {
  Section.findByIdAndUpdate(req.params.sectionId, {$set: req.body})
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};

exports.deleteSection = (req, res, next) => {
  Section.findByIdAndDelete(req.params.sectionId)
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};

