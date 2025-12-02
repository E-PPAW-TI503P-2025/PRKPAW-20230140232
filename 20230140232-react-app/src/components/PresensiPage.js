import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet Icon Issue
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function AttendancePage() {
  const [coords, setCoords] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ================== GET LOCATION ==================
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setError("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  // ================== CHECK IN ==================
  const handleCheckIn = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!coords) {
      setError("Lokasi belum siap. Mohon izinkan lokasi.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/presensi/check-in",
        {
          latitude: coords.lat,
          longitude: coords.lng,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Gagal melakukan check-in"
      );
      setMessage("");
    }
  };

  // ================== CHECK OUT ==================
  const handleCheckOut = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/presensi/check-out",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Gagal melakukan check-out"
      );
      setMessage("");
    }
  };

  // ================== UI ==================
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10">

      {/* ================== PETA DI ATAS ================== */}
      {coords && (
        <div className="w-full max-w-md my-4 border rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[coords.lat, coords.lng]}
            zoom={15}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coords.lat, coords.lng]} icon={markerIcon}>
              <Popup>Lokasi Presensi Anda</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* ================== CARD PRESENSI ================== */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center text-gray-200">
        <h2 className="text-3xl font-bold mb-6">Presensi Lokasi</h2>

        {message && <p className="text-green-400 mb-4">{message}</p>}
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={handleCheckIn}
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
          >
            Check-In
          </button>

          <button
            onClick={handleCheckOut}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;