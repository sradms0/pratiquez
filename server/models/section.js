'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create section schema
const SectionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  title: {
    type:     String,
    trim:     true,
    required: [true, 'A section title is required']
  },

  user: {
    type:     Schema.Types.ObjectId,
    ref:      'user',
    required: [true, 'A user is required']
  },

  course: {
    type:     Schema.Types.ObjectId,
    ref:      'course',
    required: [true, 'A course is required']
  },

  terms: {
    type: [{
      type: Schema.Types.ObjectId,
      ref:  'term'
    }]
  },
  
  notes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'note'
    }]
  }
});

// create export and section model
module.exports = mongoose.model('section', SectionSchema);
