# Modern Design

A modern student management and administration web application built with Node.js, Express, and MongoDB. The project includes user authentication, dashboard views, student records, course pages, results, and admin management screens.

## Features

- User registration and login
- JWT-based authentication
- Student dashboard and profile views
- Course listing and timetable pages
- Results and academic overview pages
- Admin dashboard for managing students, courses, and results
- MongoDB storage using Mongoose
- Express server with static HTML front-end pages

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas / Mongoose
- JWT for auth tokens
- bcryptjs for password hashing
- dotenv for environment config

## Project Structure

```text
modern-design/
├── config/
│   └── db.js
├── middleware/
├── models/
├── public/
├── routes/
│   ├── admin.js
│   ├── auth.js
│   └── student.js
├── views/
│   ├── admin-courses.html
│   ├── admin-dashboard.html
│   ├── admin-results.html
│   ├── admin-students.html
│   ├── courses.html
│   ├── dashboard.html
│   ├── login.html
│   ├── profile.html
│   ├── register.html
│   ├── results.html
│   └── timetable.html
├── .env
├── .gitignore
├── package.json
├── seed.js
├── server.js
└── README.md
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database connection string

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Radley-code/modern-design.git
cd modern-design
```

2. Install dependencies:

```bash
npm install
```

3. Create or update your `.env` file in the project root with the following values:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_later
MONGODB_URI=your_mongodb_connection_string
```

> Keep your `.env` file private and do not commit sensitive credentials to version control.

## Running the Application

Start the server with:

```bash
node server.js
```

For development, you can use:

```bash
npx nodemon server.js
```

Then open the app in your browser at:

- http://localhost:5000/
- http://localhost:5000/login
- http://localhost:5000/register
- http://localhost:5000/dashboard
More pages will be added.

## Main Routes

### Authentication API

- `POST /api/auth/register`
- `POST /api/auth/login`

### Student API

- `GET /api/student/*`
- `POST /api/student/*`

### Admin API

- `GET /api/admin/*`
- `POST /api/admin/*`

## Notes

This project is designed as a full-stack academic portal with server-rendered HTML views and API endpoints. The server serves static front-end pages from the `views/` folder and handles application logic through the Express routing files.

## License

This project is licensed under the ISC License.
