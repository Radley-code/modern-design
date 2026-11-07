const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const Result = require('../models/Result');
const Registration = require('../models/Registration');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalResults = await Result.countDocuments();
    const totalRegistrations = await Registration.countDocuments();

    res.status(200).json({
      success: true,
      data: { totalStudents, totalCourses, totalResults, totalRegistrations }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create course
router.post('/courses', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Record result
router.post('/results', async (req, res) => {
  try {
    const { studentId, courseId, score, session, semester } = req.body;

    // Calculate grade
    let grade;
    if (score >= 70) grade = 'A';
    else if (score >= 60) grade = 'B';
    else if (score >= 50) grade = 'C';
    else if (score >= 45) grade = 'D';
    else if (score >= 40) grade = 'E';
    else grade = 'F';

    const result = await Result.create({
      student: studentId,
      course: courseId,
      score,
      grade,
      session: session || '2025/2026',
      semester: semester || 'First'
    });

    const populated = await Result.findById(result._id).populate('student course');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all results
router.get('/results', async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'fullName matricNumber')
      .populate('course', 'code title')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;