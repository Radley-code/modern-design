const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  creditUnits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  department: {
    type: String,
    default: 'Computer Engineering'
  },
  level: {
    type: Number,
    enum: [100, 200, 300, 400, 500],
    required: true
  },
  semester: {
    type: String,
    enum: ['First', 'Second'],
    required: true
  },
  lecturer: {
    type: String,
    default: 'TBA'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);