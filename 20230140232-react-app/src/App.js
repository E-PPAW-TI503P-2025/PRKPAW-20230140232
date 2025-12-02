import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import ReportPage from './components/ReportPage';
import AttendancePage from './components/PresensiPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200">

        {/* Navbar tampil kecuali di halaman login & register */}
        {window.location.pathname !== "/login" &&
          window.location.pathname !== "/register" && <Navbar />}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/presensi" element={<AttendancePage />} />
          <Route path="/reports" element={<ReportPage />} />

          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;