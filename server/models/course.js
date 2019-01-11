'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create course schema
const CourseSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  title: {
    type:     String,
    trim:     true,
    required: [true, 'A course title is required']
  },

  user: {
    type:     Schema.Types.ObjectId,
    ref:      'user',
    required: [true, 'A user is required']
  },

  sections: {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'section'
    }]
  }
});

// create export and course model
module.exports = mongoose.model('course', CourseSchema);
