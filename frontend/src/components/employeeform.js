import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { useNavigate } from 'react-router-dom'; // Use navigate to redirect after submit
import './employeeform.css';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    img: null,
  });

  const [errors, setErrors] = useState({}); // To hold validation errors
  const navigate = useNavigate(); // Hook for navigation after form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Required field validation
    if (!employeeData.name) formErrors.name = 'Name is required';
    if (!employeeData.email) formErrors.email = 'Email is required';
    if (!employeeData.mobile) formErrors.mobile = 'Mobile number is required';
    if (!employeeData.designation) formErrors.designation = 'Designation is required';
    if (!employeeData.gender) formErrors.gender = 'Gender is required';

    // Email validation (basic)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (employeeData.email && !emailPattern.test(employeeData.email)) {
      formErrors.email = 'Invalid email address';
    }

    // Numeric validation for mobile number
    const mobilePattern = /^[0-9]+$/;
    if (employeeData.mobile && !mobilePattern.test(employeeData.mobile)) {
      formErrors.mobile = 'Mobile number must be numeric';
    }

    // File type validation (jpg/png)
    if (employeeData.img && !/\.(jpg|jpeg|png)$/i.test(employeeData.img.name)) {
      formErrors.img = 'Only jpg or png files are allowed';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send employee data to the server
        const formData = new FormData();
        Object.keys(employeeData).forEach((key) =>
          formData.append(key, employeeData[key])
        );

        await axios.post('http://localhost:5000/api/employees', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Employee added successfully');
        navigate('/employee-list'); // Redirect to employee list after successful submission
      } catch (error) {
        console.error(error);
        alert('Error adding employee');
      }
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-row">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-row">
          <label>Mobile No</label>
          <input type="text" name="mobile" onChange={handleChange} />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="form-row">
          <label>Designation</label>
          <select name="designation" onChange={handleChange}>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="form-row">
          <label>Course</label>
          <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
          <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
          <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
        </div>
        <div className="form-row">
          <label>Img Upload</label>
          <input type="file" name="img" onChange={(e) => setEmployeeData({ ...employeeData, img: e.target.files[0] })} accept=".jpg, .png" />
          {errors.img && <span className="error">{errors.img}</span>}
        </div>
        <div className="form-row">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
