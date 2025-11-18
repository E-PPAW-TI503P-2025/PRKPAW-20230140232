import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">
        {/* Navigasi hanya Login dan Register */}
        <nav className="p-4 bg-gray-800 shadow-md flex space-x-6">
          <Link
            to="/login"
            className="hover:text-gray-300 transition duration-200 font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-gray-300 transition duration-200 font-medium"
          >
            Register
          </Link>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
