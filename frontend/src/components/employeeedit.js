import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Get employee ID from URL params
import axios from 'axios';

const EmployeeEdit = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate(); // For navigation after successful edit

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

  // Fetch employee details by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployeeData(response.data); // Pre-fill the form with fetched data
      } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('Error fetching employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      // Handle course checkboxes
      setEmployeeData((prevData) => {
        const newCourse = checked
          ? [...prevData.course, value]
          : prevData.course.filter((course) => course !== value);
        return { ...prevData, course: newCourse };
      });
    } else if (type === 'file') {
      // Handle image file input
      setEmployeeData({ ...employeeData, img: e.target.files[0] });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  // Form validation (JavaScript/J-Query based)
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

  // Handle form submission (edit employee)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = new FormData();
        Object.keys(employeeData).forEach((key) => {
          if (key === 'course') {
            employeeData[key].forEach((course) => formData.append('course', course));
          } else {
            formData.append(key, employeeData[key]);
          }
        });

        await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Employee updated successfully');
        navigate('/employee-list'); // Redirect back to employee list after success
      } catch (error) {
        console.error('Error updating employee:', error);
        alert('Error updating employee');
      }
    }
  };

  return (
    <div className="employee-edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-row">
          <label>Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={employeeData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="form-row">
          <label>Designation</label>
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={employeeData.gender === 'Male'}
          />{' '}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={employeeData.gender === 'Female'}
          />{' '}
          Female
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="form-row">
          <label>Course</label>
          <input
            type="checkbox"
            name="course"
            value="MCA"
            onChange={handleChange}
            checked={employeeData.course.includes('MCA')}
          />{' '}
          MCA
          <input
            type="checkbox"
            name="course"
            value="BCA"
            onChange={handleChange}
            checked={employeeData.course.includes('BCA')}
          />{' '}
          BCA
          <input
            type="checkbox"
            name="course"
            value="BSC"
            onChange={handleChange}
            checked={employeeData.course.includes('BSC')}
          />{' '}
          BSC
        </div>
        <div className="form-row">
          <label>Img Upload</label>
          <input
            type="file"
            name="img"
            onChange={(e) =>
              setEmployeeData({ ...employeeData, img: e.target.files[0] })
            }
            accept=".jpg, .png"
          />
          {errors.img && <span className="error">{errors.img}</span>}
        </div>
        <div className="form-row">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
