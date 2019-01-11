'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create term schema
const TermSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  question: {
    type:     String,
    required: [true, 'A question is required']
  },

  answer: {
    type:     String,
    required: [true, 'An answer is required']
  },

  rightCount: {
    type:     Number,
    default:  0
  },

  wrongCount: {
    type:     Number,
    default:  0
  },

  user: {
    type:     Schema.Types.ObjectId,
    ref:      'user',
    required: [true, 'A user is required']
  },

  section: {
    type:     Schema.Types.ObjectId,
    ref:      'section',
    required: [true, 'A section is required']
  }
});

// create export and term model
module.exports = mongoose.model('term', TermSchema);
