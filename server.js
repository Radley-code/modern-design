const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", require("./routes/auth"));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// Admin dashboard (we will create later)
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin-dashboard.html"));
});
// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));
app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'courses.html'));
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'results.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

app.get('/admin/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-students.html'));
});

app.get('/admin/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-courses.html'));
});

app.get('/admin/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-results.html'));
});

app.use('/api/admin', require('./routes/admin'));

app.get('/timetable', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'timetable.html'));
});

app.get('/admin/students', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-students.html'));
});

app.get('/admin/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-courses.html'));
});

app.get('/admin/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-results.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
