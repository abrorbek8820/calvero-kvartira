import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// 🧭 Marker rasmlarini sozlaymiz
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 📍 Marker joylash funksiyasi
function LocationPicker({ onSelect }) {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function MapSelect() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  // ✅ Tanlash tugmasi
  function handleSelect() {
    if (location) {
      localStorage.setItem("selectedLocation", JSON.stringify(location));
    }
    navigate("/add-house");
  }

  // ❌ O‘tkazib yuborish tugmasi
  function handleSkip() {
    localStorage.removeItem("selectedLocation"); // 🧹 Eski joyni tozalaymiz
    navigate("/add-house"); // Forma sahifasiga o‘tamiz  relative w-full h-screen
  }

  return (
    <div className="relative w-full h-screen">

      {/* 🔘 Tugmalar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-[9999]">
        <button
          onClick={handleSkip}
          className="action-btn view text-white px-5 py-2 rounded-lg shadow hover:bg-gray-600 transition"
        >
          O‘tkazib yuborish
        </button>

        {location && (
          <button
            onClick={handleSelect}
            className="tugma-btn selec text-black px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Tanlash ✅
          </button>
        )}
      </div>


      {/* 🗺️ Karta */}
      <MapContainer
        center={[41.3111, 69.2797]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onSelect={setLocation} />
      </MapContainer>

      {/* 📍 Koordinata */}
      {location && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-700 z-[9999]">
          📍 {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </div>
      )}

      
    </div>
  );
}
