import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { regions } from "../data/regions";
import { useNavigate } from "react-router-dom";
import { applyTheme } from "../lib/theme";

export default function UyKerak() {
  const [houses, setHouses] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🌙 Light/Dark rejimni qo‘llash
  useEffect(() => {
    applyTheme();
  }, []);

  // 🏠 Supabase'dan uylarni yuklash
  async function loadHouses() {
  setLoading(true);
  let query = supabase
    .from("houses")
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: false });

  if (city) query = query.eq("city", city);
  if (district) query = query.eq("district", district);

  // 🔥 Target filtri — farqi yo‘q ham kiradi
  if (target && target !== "") {
    query = query.or(`target.eq.${target},target.eq.farqi-yoq`);
  }

  const { data, error } = await query;
  if (error) console.error(error);
  else setHouses(data || []);
  setLoading(false);
}


  useEffect(() => {
    loadHouses();
  }, [city, district, target]);

  return (
    <div className="min-h-screen p-4 transition">
      <h1 className="text-2xl font-semibold mb-4">🏠 Uy kerak</h1>

      {/* 🔍 Filtrlar */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Viloyat */}
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setDistrict("");
          }}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Viloyat</option>
          {Object.keys(regions).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Tuman */}
        {city && (
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">Tuman</option>
            {regions[city].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}

        {/* Kimlar uchun */}
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">Kimlar uchun</option>
          <option value="oila">Oilalarga</option>
          <option value="qizlar">Qizlarga</option>
          <option value="yigitlar">Yigitlarga</option>
          <option value="erkaklar">Erkaklarga</option>
          <option value="ayollar">Ayollarga</option>
        </select>

        {/* Yangilash */}
        <button
          onClick={loadHouses}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          🔄 Yangilash
        </button>
      </div>

      {/* 📋 Uylar ro‘yxati */}
      {loading ? (
        <p className="text-gray-500 text-center mt-10">Yuklanmoqda...</p>
      ) : houses.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Hozircha faol e’lon yo‘q 😔
        </p>
      ) : (
        <div className="grid gap-4">
          {houses.map((h) => (
            <div
              key={h.id}
              className="card border rounded-lg shadow p-4 flex flex-col sm:flex-row gap-3 transition"
            >
              <img
                src={h.images?.[0]}
                alt="Uy rasmi"
                className="w-[180px] h-[130px] sm:w-[200px] sm:h-[150px] object-cover rounded-lg border shadow-sm"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-1">
                  {h.rooms}-xona, {h.city}
                </h2>
                <p className="text-sm">
                  {h.district} —{" "}
                  <span className="font-semibold text-green-700 dark:text-green-400">
                    {h.price.toLocaleString()}{" "}
                    {h.currency === "YE" ? "y.e." : "so‘m"}
                  </span>{" "}
                  / {h.payment_period}
                </p>

                <p className="text-sm mt-1">
                  {h.target === "farqi-yoq"
                    ? "Hamma uchun"
                    : h.target.charAt(0).toUpperCase() + h.target.slice(1)}
                </p>

                <button
                  onClick={() => navigate(`/house-details/${h.id}`)}
                  className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  👁️ Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
