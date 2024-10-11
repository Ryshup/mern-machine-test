import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import './dashboard.css'; // Ensure this file exists

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // Fetch the username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set the username in the state
    } else {
      // If no username is found (e.g., user isn't logged in), redirect to login
      navigate('/');
    }
  }, [navigate]);

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the username (or token) from localStorage
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">Logo</div>
        <nav className="dashboard-nav">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={() => navigate('/employee-list')}>Employee List</button>
        </nav>
        <div className="admin-section">
          <span className="admin-name">{username}</span> {/* Display logged-in username */}
          <button onClick={handleLogout} className="logout-link">Logout</button> {/* Logout Button */}
        </div>
      </header>

      {/* Horizontal DashBord Bar */}
      <div className="dashboard-link-bar">
        <button className="dashboard-link">DashBord</button>
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        <h2>Welcome Admin Panel</h2>
      </main>
    </div>
  );
};

export default Dashboard;
