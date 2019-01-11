'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create note schema
const NoteSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  text: {
    type: String
  },

  images: {
    type: [{
      type: String
    }]
  },
  
  videos: {
    type: [{
      type: String
    }]
  },

  section: {
    type:     Schema.Types.ObjectId,
    ref:      'section',
    required: [true, 'A section is required']
  },

  user: {
    type:     Schema.Types.ObjectId,
    ref:      'user',
    required: [true, 'A user is required']
  }
});

// create export and note model
module.exports = mongoose.model('note', NoteSchema);
