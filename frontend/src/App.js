import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login'; // Ensure Login component is imported
import EmployeeForm from './components/employeeform';
import EmployeeList from './components/employeelist';
import EmployeeEdit from './components/employeeedit'; // Import the EmployeeEdit component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<EmployeeForm />} />
        <Route path="/employee-list" element={<EmployeeList />} /> {/* Employee List Route */}
        <Route path="/edit-employee/:id" element={<EmployeeEdit />} /> {/* Route for editing */}
        <Route path="/" element={<Login />} /> {/* Login page route */}
      </Routes>
    </Router>
  );
}

export default App;
