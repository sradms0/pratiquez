'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create image schema
const ImageSchema = new Schema({ 
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  id: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  thumbnailURL: {
    type: String,
    required: true
  },

  largeURL: {
    type: String,
    required: true
  },

  note: {
    type:     Schema.Types.ObjectId,
    ref:      'note',
    required: [true, 'A note is required']
  },

  user: {
    type:     Schema.Types.ObjectId,
    ref:      'user',
    required: [true, 'A user is required']
  }
});

// create export and image model
module.exports = mongoose.model('image', ImageSchema);
