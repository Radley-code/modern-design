const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const Course = require('../models/Course');
const Registration = require('../models/Registration');
const Result = require('../models/Result');

const router = express.Router();

// All routes below require login
router.use(protect);
router.use(restrictTo('student'));

// @desc    Get all available courses
// @route   GET /api/student/courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ code: 1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get my registered courses
// @route   GET /api/student/my-courses
router.get('/my-courses', async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('course')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Register for a course
// @route   POST /api/student/register-course
router.post('/register-course', async (req, res) => {
  try {
    const { courseId, session, semester } = req.body;

    // Check if already registered
    const exists = await Registration.findOne({
      student: req.user._id,
      course: courseId,
      session: session || '2025/2026',
      semester: semester || 'First'
    });

    if (exists) {
      return res.status(400).json({ success: false, message: 'You are already registered for this course.' });
    }

    const registration = await Registration.create({
      student: req.user._id,
      course: courseId,
      session: session || '2025/2026',
      semester: semester || 'First'
    });

    const populated = await registration.populate('course');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get my results
// @route   GET /api/student/results
router.get('/results', async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id })
      .populate('course')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/student/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id }).populate('course');
    const results = await Result.find({ student: req.user._id }).populate('course');

    // Calculate total credit units
    const totalUnits = registrations.reduce((sum, reg) => sum + (reg.course?.creditUnits || 0), 0);

    // Simple GPA calculation
    const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach(result => {
      const units = result.course?.creditUnits || 0;
      totalPoints += (gradePoints[result.grade] || 0) * units;
      totalCredits += units;
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

    res.status(200).json({
      success: true,
      data: {
        registeredCourses: registrations.length,
        totalUnits,
        gpa,
        recentResults: results.slice(0, 5)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;