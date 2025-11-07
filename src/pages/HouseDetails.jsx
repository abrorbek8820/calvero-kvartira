import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function HouseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [ownerPhone, setOwnerPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🏠 Uy ma'lumotini olish
  useEffect(() => {
    async function loadHouse() {
      const { data, error } = await supabase
        .from("houses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Uy topilmadi:", error);
        setLoading(false);
        return;
      }

      setHouse(data);
      // 🔹 Uy egasining telefon raqamini users jadvalidan olish
      if (data?.user_id) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("phone")
          .eq("id", data.user_id)
          .single();

        if (!userError && userData?.phone) {
          setOwnerPhone(userData.phone);
        }
      }
      setLoading(false);
    }

    loadHouse();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        ⏳ Yuklanmoqda...
      </div>
    );

  if (!house)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        ❌ Uy topilmadi
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          ← Ortga
        </button>
      </div>
    );

  // 🌍 Google Maps link (latitude / longitude)
  const hasCoords = house.latitude && house.longitude;
  const mapsUrl = hasCoords
    ? `https://www.google.com/maps?q=${house.latitude},${house.longitude}`
    : null;

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-3 inline-block"
      >
        ← Ortga
      </button>

      <div className="bg-white rounded-xl shadow p-4 max-w-3xl mx-auto">
        {/* 🖼️ Rasmlar galereyasi */}
        {house.images && house.images.length > 0 ? (
          <div className="flex overflow-x-auto gap-2 mb-4 pb-1 scrollbar-hide">
            {house.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Uy rasmi ${i + 1}`}
                className="w-[230px] h-[170px] object-cover rounded-lg border shadow-sm flex-shrink-0"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
            Rasm mavjud emas
          </div>
        )}

        {/* 📍 Viloyat / Tuman */}
        <h1 className="text-2xl font-semibold mb-1">
          📍 {house.city} — {house.district}
        </h1>

        {/* 🏠 Xonalar */}
        <p className="text-gray-700 mb-3">🏠 {house.rooms}-xona uy</p>

        {/* 💰 Narx */}
        <p className="text-xl font-bold text-green-700 mb-1">
          💰 {house.price.toLocaleString()}{" "}
          {house.currency === "YE" ? "y.e." : "so‘m"} / {house.payment_period}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Narx turi:{" "}
          <span className="font-medium text-gray-700">
            {house.price_type === "bir_kishiga"
              ? "1 kishiga"
              : "Umumiy narx"}
          </span>
        </p>

        {/* 👥 Kimlarga */}
        <div className="mb-3">
          <p className="font-medium text-gray-700">👥 Kimlarga:</p>
          <p className="text-gray-600 capitalize">
            {house.target === "farqi-yoq" ? "Hamma uchun" : house.target}
          </p>
        </div>

        {/* 👨‍👩‍👧‍👦 Ko‘pi bilan */}
        {house.max_people && (
          <p className="text-gray-700 mb-3">
            👨‍👩‍👧‍👦 Ko‘pi bilan:{" "}
            <span className="font-semibold">{house.max_people}</span> kishi
          </p>
        )}

        {/* 🏡 Uy egasi bilan / egasisiz */}
        <p className="text-gray-700 mb-3">
          🏡 {house.owner_with ? "Uy egasi bilan yashaladi" : "Uy egasisiz"}
        </p>

        {/* 📖 Qo‘shimcha ma’lumot */}
        {house.description && (
          <div className="mb-4">
            <p className="font-medium text-gray-700 mb-1">
              📖 Qo‘shimcha ma’lumot:
            </p>
            <p className="text-gray-600 whitespace-pre-line">
              {house.description}
            </p>
          </div>
        )}

        {/* 🔘 Tugmalar zonasi */}
<div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
  {hasCoords && (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="action-btn view"
    >
      🗺️ Xaritada ko‘rish
    </a>
  )}

  {ownerPhone && (
    <a href={`tel:+${ownerPhone}`} className="action-btn call">
      📞 Qo‘ng‘iroq qilish
    </a>
  )}
</div>

      </div>
    </div>
  );
}
