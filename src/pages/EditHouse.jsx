import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { regions } from "../data/regions";

export default function EditHouse() {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]); // eski + yangi rasmlar
  const [loading, setLoading] = useState(false);

  // 🔹 Ma’lumotni localStorage’dan olish
  useEffect(() => {
    const stored = localStorage.getItem("editHouse");
    if (stored) {
      const parsed = JSON.parse(stored);
      setForm(parsed);
      setImages(parsed.images || []);
    } else {
      navigate("/my-houses");
    }
  }, [navigate]);

  // 🔹 Forma o‘zgarishi
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  // 🔹 Rasm o‘chirish (mahalliy)
  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // 🔹 Formani yuborish
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // 🧠 Avval eski URL-larni olib qolamiz
    let uploadedUrls = [];
    const existingUrls = images.filter((i) => typeof i === "string");
    uploadedUrls.push(...existingUrls);

    // 🖼️ Faqat yangi fayllarni yuklaymiz
    const newFiles = images.filter((i) => typeof i !== "string");

    if (newFiles.length > 0) {
      for (const img of newFiles) {
        const fileName = `${Date.now()}_${img.name}`;
        const { error: uploadError } = await supabase.storage
          .from("houses")
          .upload(fileName, img);

        if (uploadError) {
          console.error("❌ Rasm yuklashda xato:", uploadError);
          continue;
        }

        // ✅ Public URL olish
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

    // 🔚 Endi uploadedUrls = eski + yangi rasmlar
    console.log("📸 Yakuniy rasmlar:", uploadedUrls);

    // 🔹 Ma’lumotni yangilash
    const { error } = await supabase
      .from("houses")
      .update({
        ...form,
        images: uploadedUrls,
      })
      .eq("id", form.id);

    setLoading(false);

    if (error) {
      alert("❌ Xatolik: " + error.message);
    } else {
      alert("✅ Ma’lumot yangilandi!");
      localStorage.removeItem("editHouse");
      navigate("/my-houses");
    }
  }

  if (!form)
    return <p className="p-4 text-gray-500">Yuklanmoqda...</p>;

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-3 inline-block"
      >
        ← Ortga
      </button>

      <h1 className="text-2xl font-semibold mb-4">
        ✏️ Uy ma’lumotini tahrirlash
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Xonalar */}
        <input
          name="rooms"
          type="number"
          placeholder="Necha xona"
          value={form.rooms}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Viloyat */}
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

        {/* Tuman */}
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

        {/* Narx va valyuta */}
        <div className="flex gap-2 flex-wrap">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Narx"
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
            <option value="YE">y.e.</option>
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
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Qo‘shimcha ma’lumot"
          className="border p-2 rounded h-24"
        ></textarea>

        {/* Rasm */}
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

          {/* 🖼️ Rasmlar ko‘rish + o‘chirish */}
          {images.length > 0 && (
            <div className="mt-2 overflow-x-auto">
              <div className="flex gap-2 relative">
                {images.map((file, i) => (
                  <div key={i} className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition cursor-pointer z-20 shadow-md"
                    >
                      ✕
                    </button>

                    <img
                      src={
                        typeof file === "string"
                          ? file // eski rasm (string)
                          : URL.createObjectURL(file) // yangi rasm (File)
                      }
                      alt="preview"
                      className="w-[180px] h-[130px] object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded mt-2 disabled:opacity-60"
        >
          {loading ? "Saqlanmoqda..." : "✅ O‘zgarishlarni saqlash"}
        </button>
      </form>
    </div>
  );
}
