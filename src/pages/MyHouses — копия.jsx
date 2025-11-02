import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function MyHouses() {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHouses() {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const { data, error } = await supabase
      .from("houses")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    if (error) console.error(error);
    else setHouses(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadHouses();
  }, []);

  // 🗑️ O‘chirish funksiyasi
  async function handleDelete(id) {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;

    const { error } = await supabase.from("houses").delete().eq("id", id);
    if (error) alert("Xatolik: " + error.message);
    else {
      alert("✅ E’lon o‘chirildi!");
      setHouses((prev) => prev.filter((h) => h.id !== id));
    }
  }

  // ✏️ Tahrirlash
  function handleEdit(house) {
    localStorage.setItem("editHouse", JSON.stringify(house));
    navigate("/edit-house");
  }

  // 🟢 Faollikni o‘zgartirish
  async function toggleActive(houseId, currentStatus) {
    const { error } = await supabase
      .from("houses")
      .update({ is_active: !currentStatus })
      .eq("id", houseId);

    if (error) {
      alert("Xatolik: " + error.message);
    } else {
      setHouses((prev) =>
        prev.map((h) =>
          h.id === houseId ? { ...h, is_active: !currentStatus } : h
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">🏘️ Mening uylarim</h1>
        <button
          onClick={() => {
            localStorage.removeItem("selectedLocation");
            navigate("/map-select");
          }}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          + Uy qo‘shish
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Yuklanmoqda...</p>
      ) : houses.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Hozircha e’lon yo‘q. ➕ yangi qo‘shing.
        </p>
      ) : (
        <div className="grid gap-4">
          {houses.map((h) => (
  <div
    key={h.id}
    className={`relative border rounded-lg bg-white shadow p-4 flex flex-col sm:flex-row gap-3 transition ${
      !h.is_active ? "opacity-60" : ""
    }`}
  >
    {/* 🖼️ Uy rasmi */}
    <div className="relative">
  {h.images && h.images.length > 0 ? (
    <img
      src={h.images[0]}
      alt="Uy rasmi"
      className="w-[180px] h-[130px] sm:w-[200px] sm:h-[150px] object-cover rounded-lg border shadow-sm"
    />
  ) : (
    <div className="w-[180px] h-[130px] sm:w-[200px] sm:h-[150px] bg-gray-100 flex items-center justify-center rounded-lg border text-gray-400 relative">
      Rasm yo‘q
    </div>
  )}

  {/* 🔘 Switch rasm ichida o‘ng tepa burchakda */}
  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-white/80 rounded-full px-2 py-[1px] shadow-sm">
    <span
      className={`text-[10px] font-semibold ${
        h.is_active ? "text-green-700" : "text-gray-500"
      }`}
    >
      {h.is_active ? "Faol" : "Yashirin"}
    </span>

    <div
      onClick={() => toggleActive(h.id, h.is_active)}
      className={`relative w-8 h-4 rounded-full cursor-pointer transition-colors duration-300 ${
        h.is_active ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-[1px] left-[1px] w-[14px] h-[14px] bg-white rounded-full shadow transform transition-all duration-300 ease-in-out ${
          h.is_active ? "translate-x-[16px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  </div>
</div>


    {/* 📋 Ma’lumot */}
    <div className="flex-1">
      <h2 className="font-semibold text-lg mb-1">
        {h.rooms}-xona, {h.city}
      </h2>
      <p className="text-sm text-gray-600">
        {h.district} —{" "}
        <span className="font-semibold text-green-700">
          {h.price.toLocaleString()}{" "}
          {h.currency === "YE" ? "y.e." : "so‘m"}
        </span>{" "}
        / {h.payment_period}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {h.target === "farqi-yoq"
          ? "Hamma uchun"
          : h.target.charAt(0).toUpperCase() + h.target.slice(1)}
      </p>

      {h.description && (
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {h.description}
        </p>
      )}

      {/* ✏️ 🗑️ Tugmalar + 🔘 Faollik switch */}
<div className="w-full mt-4 flex justify-between items-center sm:items-start">
  {/* Chapdagi tugmalar */}
  <div className="flex gap-3 flex-shrink-0">
    <button
      onClick={() => handleEdit(h)}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm sm:text-base"
    >
      ✏️ Tahrirlash
    </button>
    <button
      onClick={() => handleDelete(h.id)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm sm:text-base"
    >
      🗑️ O‘chirish
    </button>
  </div>

  {/* 🔘 Faollik tugmasi */}
<div className="flex items-center gap-2 ml-auto flex-shrink-0 pr-1">
  <span
    className={`text-sm font-semibold select-none ${
      h.is_active ? "text-green-700" : "text-gray-500"
    }`}
  >
    {h.is_active ? "Faol" : "Yashirin"}
  </span>

  <div
    onClick={() => toggleActive(h.id, h.is_active)}
    className={`relative w-[50px] h-[26px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out overflow-hidden ${
      h.is_active ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`absolute top-[3px] left-[3px] w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        h.is_active ? "translate-x-[24px]" : "translate-x-0"
      }`}
    ></div>
  </div>
</div>

</div>


    </div>
  </div>
))}


        </div>
      )}
    </div>
  );
}
