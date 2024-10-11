import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for navigation
import axios from 'axios'; // For API calls
import './employeelist.css'; // Add corresponding CSS for styling

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Number of employees per page
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [username, setUsername] = useState(''); // State to hold username

  // Fetch the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set username if found
    } else {
      navigate('/'); // Redirect to login if username not found
    }
  }, [navigate]);

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Error fetching employees');
      }
    };
    fetchEmployees();
  }, []);

  // Delete an employee by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      // Remove the deleted employee from the local state
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  // Search Filter (with date as part of the search term)
  const filteredEmployees = employees.filter((employee) => {
    const searchTermLower = searchTerm.toLowerCase();
    const employeeCreatedDate = new Date(employee.createdDate).toLocaleDateString();
    
    const searchMatch = employee.name.toLowerCase().includes(searchTermLower) ||
                        employee.email.toLowerCase().includes(searchTermLower) ||
                        employeeCreatedDate.includes(searchTermLower);

    return searchMatch;
  });

  // Pagination Logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sorting Logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  // Handle Edit Button
  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Handle Active/Deactivate toggle
  const toggleActive = (id) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee._id === id) {
        return { ...employee, active: !employee.active };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className="employee-list-container">
      {/* Header Section */}
      <header className="employee-list-header">
        <div className="logo">Logo</div>
        <nav className="header-nav">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={() => navigate('/employee-list')}>Employee List</button>
        </nav>
        <div className="admin-section">
          <span className="admin-name">{username}</span>
          <button onClick={() => navigate('/')} className="logout-link">Logout</button>
        </div>
      </header>

      {/* Yellow Bar */}
      <div className="yellow-bar">
        <span>Employee List</span>
        <button className="create-employee-btn" onClick={() => navigate('/create-employee')}>
          Create Employee
        </button>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Unique Id</th>
            <th>Image</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort('createdDate')}>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              {/* Display image with correct path */}
              <td><img src={`http://localhost:5000${employee.img}`} alt="Employee" className="employee-image" /></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td>{new Date(employee.createdDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                <button onClick={() => toggleActive(employee._id)}>
                  {employee.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
