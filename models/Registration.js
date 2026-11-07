const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  session: {
    type: String,
    required: true,
    default: '2025/2026'
  },
  semester: {
    type: String,
    enum: ['First', 'Second'],
    required: true
  }
}, {
  timestamps: true
});

// Prevent duplicate registration
registrationSchema.index({ student: 1, course: 1, session: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);