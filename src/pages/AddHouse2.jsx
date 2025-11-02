import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { regions } from "../data/regions";


import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function ResizeMapOnShow({ show }) {
  const map = useMap();
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [show]);
  return null;
}


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

export default function AddHouse() {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);
const [location, setLocation] = useState({ lat: "", lng: "" });

  // 🔹 Forma holati
  const [form, setForm] = useState({
    rooms: "",
    city: "",
    district: "",
    price: "",
    currency: "UZS",
    payment_period: "oyiga",
    price_type: "umumiy",
    target: "",
    owner_with: false,
    description: "",
    max_people: 1,
  });

  // 🔹 Rasm holati
  const [images, setImages] = useState([]);

  // 🔹 Forma maydonlarini o‘zgartirish
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  // 🔹 Formani yuborish
  async function handleSubmit(e) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) return navigate("/register");

    let uploadedUrls = [];

    // 🖼️ Agar foydalanuvchi rasm tanlagan bo‘lsa — Supabase Storage’ga yuklaymiz
    if (images.length > 0) {
      for (const img of images) {
        const fileName = `${Date.now()}_${img.name}`;

        const { error: uploadError } = await supabase.storage
          .from("houses")
          .upload(fileName, img);

        if (uploadError) {
          console.error("Rasm yuklashda xato:", uploadError);
          continue;
        }

        // 🔹 Public URL olish
        const { data: publicUrl } = supabase.storage
          .from("houses")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl.publicUrl);
      }
    }

    // 🏠 Uy ma’lumotlarini saqlash
    const { error } = await supabase.from("houses").insert([
      {
        ...form,
        user_id: userId,
        images: uploadedUrls.length > 0 ? uploadedUrls : null,
        latitude: location.lat || null,
    longitude: location.lng || null,
      },
    ]);

    if (error) {
      alert("Xatolik: " + error.message);
    } else {
      alert("✅ Uy muvaffaqiyatli qo‘shildi!");
      navigate("/my-houses");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-3 inline-block"
      >
        ← Ortga
      </button>

      <h1 className="text-2xl font-semibold mb-4">🏡 Uy qo‘shish</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Xonalar soni */}
        <input
          name="rooms"
          type="number"
          placeholder="Necha xona"
          value={form.rooms}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Viloyat / Shahar */}
        <select
          name="city"
          value={form.city}
          onChange={(e) => {
            handleChange(e);
            setForm({ ...form, city: e.target.value, district: "" });
          }}
          className="border p-2 rounded"
          required
        >
          <option value="">Viloyat / Shaharni tanlang</option>
          {Object.keys(regions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* Tumanni avtomatik ko‘rsatish */}
        {form.city && (
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Tumanni tanlang</option>
            {regions[form.city].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}

        {/* Narx + Valyuta + To‘lov turi + Narx turi */}
        <div className="flex flex-wrap gap-2">
          <input
            name="price"
            type="number"
            placeholder="Narx"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded flex-1 min-w-[120px]"
            required
          />

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="UZS">so‘m</option>
            <option value="USD">$</option>
          </select>

          <select
            name="payment_period"
            value={form.payment_period}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="oyiga">oyiga</option>
            <option value="sutkaga">sutkaga</option>
          </select>

          <select
            name="price_type"
            value={form.price_type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="umumiy">Umumiy</option>
            <option value="bir_kishiga">1 kishiga</option>
          </select>
        </div>

        {/* Kimlarga */}
        <select
          name="target"
          value={form.target}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Kimlarga?</option>
          <option value="qizlar">Student qizlarga</option>
          <option value="yigitlar">Student yigitlarga</option>
          <option value="erkaklar">Erkaklarga</option>
          <option value="ayollar">Ayollarga</option>
          <option value="oila">Oilaga</option>
          <option value="farqi-yoq">Farqi yo‘q</option>
        </select>

        {/* Necha kishi uchun */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Necha kishi uchun?
          </label>
          <select
            name="max_people"
            value={form.max_people}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} kishi
              </option>
            ))}
          </select>
        </div>

        {/* Uy egasi bilan yashash */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="owner_with"
            checked={form.owner_with}
            onChange={handleChange}
          />
          Uy egasi bilan yashaladi
        </label>

        {/* Manzil tanlash */}
<div className="border p-3 rounded bg-white shadow-sm">
  <label className="block text-sm text-gray-600 mb-1">
    Manzilni xaritadan tanlash (ixtiyoriy)
  </label>

  {location.lat && location.lng ? (
    <p className="text-sm text-green-700 mb-2">
      📍 Tanlangan joy: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
    </p>
  ) : (
    <p className="text-sm text-gray-500 mb-2">
      Hozircha joy tanlanmagan
    </p>
  )}

  <button
    type="button"
    onClick={() => setShowMap(true)}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    🗺️ Xaritadan tanlash
  </button>
</div>


        {/* Qo‘shimcha ma’lumot */}
        <textarea
          name="description"
          placeholder="Qo‘shimcha ma’lumot"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded h-24"
        ></textarea>

        {/* Rasm (ixtiyoriy, 5 tagacha) */}
        <div>
  <label className="block text-sm text-gray-600 mb-1">
    Uy rasmlari (ixtiyoriy, 5 tagacha)
  </label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => {
      const files = Array.from(e.target.files);
      setImages((prev) => {
        const combined = [...prev, ...files].slice(0, 5); // umumiy 5 tagacha rasm
        return combined;
      });
    }}
    className="border p-2 rounded w-full"
  />

  {/* Oldindan ko‘rish (preview) */}
{images.length > 0 && (
  <div className="mt-2 overflow-x-auto">
    
    <div className="flex gap-2 relative">
      
      {images.map((file, i) => (
        
        <div key={i} className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setImages((prev) => prev.filter((_, index) => index !== i))}
            className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition cursor-pointer z-20 shadow-md"
          >
            ✕
          </button>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="w-[180px] h-[130px] object-cover rounded-lg border border-gray-200 shadow-sm"
          />

          {/* ❌ O‘chirish tugmasi */}
          
        </div>
      ))}
    </div>
  </div>
)}


</div>


        <button className="bg-blue-600 text-white py-2 rounded">
          Saqlash
        </button>

        {/* Karta oynasi (modal) */}
{showMap && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg h-[500px] relative">
      <button
        type="button"
        onClick={() => setShowMap(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 font-bold z-10"
      >
        ✕
      </button>

      <MapContainer
  center={[41.3111, 69.2797]}
  zoom={13}
  className="w-full h-[450px] rounded-lg"
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <LocationPicker onSelect={(coords) => setLocation(coords)} />
    <ResizeMapOnShow show={showMap} />

</MapContainer>


      <button
        type="button"
        onClick={() => setShowMap(false)}
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-md"
      >
        Tanlash
      </button>
    </div>
  </div>
)}



      </form>
    </div>
  );
}



