const express = require('express');
const path = require('path');
const Employee = require('../models/Employee'); // Employee model
const multer = require('multer'); // For handling file uploads
const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // File naming convention
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only jpg, jpeg, or png files are allowed!')); // File validation
    }
    cb(null, true);
  }
});

// Serve static files (uploads)
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create employee route with server-side validation and createdDate
router.post('/employees', upload.single('img'), async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    console.log('Received data:', { name, email, mobile, designation, gender, course });

    if (!name || !email || !mobile || !designation || !gender) {
      console.log('Validation error: Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const mobilePattern = /^[0-9]+$/;
    if (!mobilePattern.test(mobile)) {
      return res.status(400).json({ error: 'Mobile number must be numeric' });
    }

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course: Array.isArray(course) ? course : [course],
      img: req.file ? `/uploads/${req.file.filename}` : '', // Ensure img is stored as relative path
      createdDate: new Date() // Store the current date
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Error adding employee' });
  }
});

// Fetch all employees from the database
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from the database
    res.status(200).json(employees); // Send the list of employees as a response
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

// Fetch a single employee by ID
router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id); // Find the employee by ID
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' }); // If employee not found
    }
    res.status(200).json(employee); // Send the employee data as response
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ error: 'Error fetching employee details' });
  }
});

// DELETE employee by ID
router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id); // Find and delete the employee
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

// Update employee route with validation and handling img
router.put('/employees/:id', upload.single('img'), async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Required field validation
    if (!name || !email || !mobile || !designation || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation (basic regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for email duplication (except for the current employee)
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee && existingEmployee._id.toString() !== id) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Numeric validation for mobile number
    const mobilePattern = /^[0-9]+$/;
    if (!mobilePattern.test(mobile)) {
      return res.status(400).json({ error: 'Mobile number must be numeric' });
    }

    // Update employee fields
    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = Array.isArray(course) ? course : [course];
    employee.img = req.file ? `/uploads/${req.file.filename}` : employee.img; // Ensure img path is updated if a new file is uploaded
    employee.createdDate = employee.createdDate || new Date(); // Ensure createdDate is preserved

    await employee.save(); // Save the updated employee

    res.status(200).json(employee); // Return the updated employee data
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Export the router
module.exports = router;
