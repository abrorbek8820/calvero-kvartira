import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { applyTheme } from "../lib/theme";

export default function MyHouses() {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Foydalanuvchi tekshiruv
  useEffect(() => {
    const phone = localStorage.getItem("userPhone");
    if (!phone) {
      console.warn("[MyHouses] No userPhone found, redirecting...");
      navigate("/register");
    }
  }, [navigate]);

  // 🌙 Dark/Light rejimni qo‘llash
  useEffect(() => {
    applyTheme();
    console.log("[MyHouses] Theme applied on mount");
  }, []);

  // 🏠 Uylarni yuklash
  async function loadHouses() {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("[MyHouses] No userId found, redirecting...");
      navigate("/register");
      return;
    }

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
    <div className="container">
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
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          Yuklanmoqda...
        </p>
      ) : houses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          Hozircha e’lon yo‘q. ➕ yangi qo‘shing.
        </p>
      ) : (
        <div className="grid gap-4">
          {houses.map((h) => (
            <div
              key={h.id}
              className={`border rounded-lg bg-white dark:bg-gray-800 shadow relative overflow-visible transition ${
                !h.is_active ? "opacity-60" : ""
              }`}
            >
              <div className="relative w-full">
                {h.images && h.images.length > 0 ? (
                  <img
                    src={h.images[0]}
                    alt="Uy rasmi"
                    className="w-full h-[180px] object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[180px] bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-t-lg text-gray-400 dark:text-gray-300">
                    Rasm yo‘q
                  </div>
                )}
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">
                  {h.rooms}-xona, {h.city}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {h.district} —{" "}
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {h.price.toLocaleString()}{" "}
                    {h.currency === "YE" ? "y.e." : "so‘m"}
                  </span>{" "}
                  / {h.payment_period}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {h.target === "farqi-yoq"
                    ? "Hamma uchun"
                    : h.target.charAt(0).toUpperCase() + h.target.slice(1)}
                </p>

                {h.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                    {h.description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleEdit(h)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    ✏️ Tahrirlash
                  </button>

                  <button
                    onClick={() => handleDelete(h.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                  >
                    🗑️ O‘chirish
                  </button>

                  <button
                    onClick={() => toggleActive(h.id, h.is_active)}
                    className={`px-3 py-1 rounded text-sm font-medium border transition-all duration-300 ${
                      h.is_active
                        ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-500 hover:bg-gray-400"
                    }`}
                  >
                    {h.is_active ? "Faol ✅" : "Yashirin 🚫"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
