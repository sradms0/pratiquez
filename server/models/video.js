'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create video schema
const VideoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  videoId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  thumbnailURL: {
    type: String,
    required: true
  },

  thumbnailHeight: {
    type: Number,
    required: true,
    default: 90
  },

  thumbnailwidth: {
    type: Number,
    required: true,
    default: 120
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
})

// create export and video model
module.exports = mongoose.model('video', VideoSchema);
