'use strict';

const mongoose = require('mongoose');
const Course   = require('../models/course');
const User     = require('../models/user');

exports.allCourses = (req, res, next) => {
  // get all courses under user
  Course.find({ user: req.session.userId })
    .populate({ path: 'user', select: 'email'})
    .populate({ path: 'sections', select: 'title'})
    .then(courses => res.json(courses))
    .catch(err => next(err));
};

exports.singleCourse = (req, res, next) => {
  Course.findById(req.params.courseId)
    .populate({ path: 'user', select: 'email'})
    .populate({ path: 'sections', select: 'title'})
    .then(course => {
      if (!course) {
        const err = new Error(`Course with id: ${req.params.courseId} does not exist`);
        err.status = 404;
        return next(err);
      }
      return res.json(course)
    })
    .catch(err => next(err));
};

exports.registerCourse = (req, res, next) => {
  // get current user
  User.findById(req.session.userId)
    .then(user => {
      // create course, sign with user id
      req.body.user = user._id;
      Course.create(req.body)
        .then(course => {
          // add course to users courses
          // and save
          user.courses.push(course);
          user.save(err => {
            if (err) return next(err); 
            res
              .status(201)
              .setHeader('Location', '/');
            return res.end();
          });

        })
        .catch(err => { 
          err.status = 400;
          return next(err); 
    })
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
  });
};

exports.updateCourse = (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, {$set: req.body})
    .then(() => res.status(204).end())
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};

exports.deleteCourse = (req, res, next) => {
  Course.findByIdAndDelete(req.params.courseId)
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => { 
      err.status = 400;
      return next(err); 
    });
};
