import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
  const [userName, setUserName] = useState('Pengguna');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.nama || 'Pengguna (Nama Tidak Ditemukan)');
      } catch {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
      <div className="bg-gray-800 rounded-lg p-10 w-full max-w-md text-center text-gray-200">
        <h1 className="text-3xl font-semibold mb-4">Dashboard Aplikasi</h1>
        <p className="text-xl mb-6">
          Selamat Datang, <span className="font-bold text-gray-100">{userName}</span>!
        </p>
        <p className="mb-10 text-gray-400">
          Anda berhasil login dan memiliki akses ke halaman ini.
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition text-gray-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;