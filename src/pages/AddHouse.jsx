import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { regions } from "../data/regions";

export default function AddHouse() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loc = localStorage.getItem("selectedLocation");
    if (loc) setLocation(JSON.parse(loc));
  }, []);

  const [form, setForm] = useState({
    city: "",
    district: "",
    rooms: "",
    price: "",
    currency: "UZS",
    payment_period: "oyiga",
    price_type: "umumiy",
    target: "",
    owner_with: false,
    description: "",
    max_people: 1,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const userId = localStorage.getItem("userId");
  if (!userId) return navigate("/register",);

  let uploadedUrls = [];

  // 🖼️ Rasm yuklash
  if (images.length > 0) {
    for (const img of images) {
      const fileName = `${Date.now()}_${img.name}`;
      const { error: uploadError } = await supabase.storage
        .from("houses")
        .upload(fileName, img);

      if (uploadError) {
        console.error("Rasm yuklashda xato:", uploadError);
        continue; // shu rasmni tashlab ketamiz
      }

      // ✅ Public URL to‘g‘ri olish
      const { data } = supabase.storage
        .from("houses")
        .getPublicUrl(fileName);

      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      } else {
        console.warn("⚠️ Rasm URL olinmadi:", fileName);
      }
    }
  }

  // 🏠 Uy ma’lumotini bazaga yozish
  const { error } = await supabase.from("houses").insert([
    {
      ...form,
      user_id: userId,
      images: uploadedUrls.length > 0 ? uploadedUrls : null,
      latitude: location?.lat || null,
      longitude: location?.lng || null,
    },
  ]);

  if (error) {
    alert("Xatolik: " + error.message);
  } else {
    alert("✅ Uy muvaffaqiyatli qo‘shildi!");
    localStorage.removeItem("selectedLocation");
    navigate("/my-houses", { replace: true });
  }
}

  return (
    <div className="container">
      

      <h1 className="text-2xl font-semibold mb-4">🏡 Uy ma’lumotlari</h1>

      {location && (
        <div className="text-sm text-green-700 mb-3">
          📍 Tanlangan joy: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">



        {/* Viloyat */}
        <select
          name="city"
          value={form.city}
          onChange={(e) => {
            handleChange(e);
            setForm({ ...form, city: e.target.value, district: "" });
          }}
          className="border p-3 rounded-lg text-[15px]"

          required
        >
          <option value="">Viloyat / Shahar</option>
          {Object.keys(regions).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Tuman */}
        {form.city && (
          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            className="border p-3 rounded-lg text-[15px]"

            required
          >
            <option value="">Tuman / Shahar</option>
            {regions[form.city].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}

        {/* Xonalar */}
        <input
          name="rooms"
          type="number"
          placeholder="Necha xona"
          value={form.rooms}
          onChange={handleChange}
          className="border p-3 rounded-lg text-[15px]"

          required
        />

        {/* Narx / Valyuta / To‘lov turi / Narx turi */}
        <div className="flex flex-wrap gap-3">

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
            className="border p-3 rounded-lg text-[15px]"

          >
            <option value="UZS">so‘m</option>
            <option value="YE">y.e.</option>
          </select>

          <select
            name="payment_period"
            value={form.payment_period}
            onChange={handleChange}
            className="border p-3 rounded-lg text-[15px]"

          >
            <option value="oyiga">oyiga</option>
            <option value="sutkaga">sutkaga</option>
          </select>

          <select
            name="price_type"
            value={form.price_type}
            onChange={handleChange}
            className="border p-3 rounded-lg text-[15px]"

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
          className="border p-3 rounded-lg text-[15px]"

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

        {/* Uy egasi bilan yashaladi */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="owner_with"
            checked={form.owner_with}
            onChange={handleChange}
          />
          Uy egasi bilan yashaladi
        </label>

        {/* Qo‘shimcha ma’lumot */}
        <textarea
          name="description"
          placeholder="Qo‘shimcha ma’lumot"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded h-24"
        ></textarea>

        {/* 🖼️ Uy rasmlari (ixtiyoriy, 5 tagacha) */}
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
              setImages((prev) => [...prev, ...files].slice(0, 5));
            }}
            className="border p-2 rounded w-full"
          />

          {/* Oldindan ko‘rish (preview) */}
          {images.length > 0 && (
            <div className="mt-3 flex gap-3 overflow-x-auto py-2">

              {images.map((file, i) => (
                <div key={i} className="relative flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition cursor-pointer z-20"
                  >
                    ✕
                  </button>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-[180px] h-[130px] object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="bg-green-600 text-white py-2 rounded">
          Saqlash ✅
        </button>
      </form>
    </div>
  );
}
