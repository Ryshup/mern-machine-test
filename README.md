# MERN Machine Test Project

This is a **MERN Stack** (MongoDB, Express, React, Node.js) project created as part of a machine test. The project includes user authentication, employee management (CRUD operations), and file uploads (image). It demonstrates a full-stack web application using the MERN stack.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The project consists of a login system, an employee management system, and file upload functionality for employee images. The front-end is built with React, and the back-end is built with Node.js and Express, using MongoDB as the database. 

## Features
- **User Authentication**: Login and logout functionality.
- **Employee Management**: Create, read, update, and delete (CRUD) employees.
- **Image Upload**: Employees can upload profile pictures (jpg, jpeg, png).
- **Search**: Search functionality for employees based on name, email, and creation date.
- **Pagination**: Supports pagination for large employee lists.
- **Form Validation**: Client-side and server-side validation for employee forms.

## Technologies Used
- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js, Multer (for file uploads)
- **Database**: MongoDB (MongoDB Compass for management)
- **Other Tools**: Git, GitHub

## Setup Instructions
To run this project locally, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (Install locally or use MongoDB Atlas)
- [Git](https://git-scm.com/)
- A package manager like [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Ryshup/mern-machine-test.git
cd mern-machine-test
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the `backend` folder and add the following:
   ```
   MONGO_URI=mongodb://localhost:27017/mern-machine-test
   PORT=5000
   ```

4. Run MongoDB locally (or make sure MongoDB Atlas is connected if using a cloud database).

5. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

### 4. Access the Application
- Frontend (React): `http://localhost:3000`
- Backend (API): `http://localhost:5000`

## Running the Application

### Run Backend
```bash
cd backend
npm start
```

### Run Frontend
```bash
cd frontend
npm start
```

### MongoDB
Make sure MongoDB is running locally or in the cloud. You can use [MongoDB Compass](https://www.mongodb.com/products/compass) to view your database.

## API Endpoints
### Authentication
- **POST** `/api/login`: Login and authenticate a user.

### Employee Management
- **GET** `/api/employees`: Fetch all employees.
- **POST** `/api/employees`: Add a new employee.
- **GET** `/api/employees/:id`: Fetch employee by ID.
- **PUT** `/api/employees/:id`: Update employee by ID.
- **DELETE** `/api/employees/:id`: Delete employee by ID.

## Folder Structure
```
mern-machine-test/
│
├── backend/                # Backend (Express.js, Node.js)
│   ├── models/             # Mongoose models (Employee, Login)
│   ├── routes/             # API routes (Employee, Auth)
│   ├── uploads/            # Directory to store uploaded images
│   └── server.js           # Entry point for the backend server
│
├── frontend/               # Frontend (React)
│   ├── public/             # Public files (index.html)
│   ├── src/                # React components, pages, styles
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project documentation
```

## Contributing
Feel free to contribute to this project by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.
