import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { applyTheme } from "../lib/theme";
import "../styles/register-theme.css";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    applyTheme();
  }, []);

  

  // Format: 90 123 45 67
  function formatPhone(value) {
  // faqat raqamlarni qoldiramiz
  value = value.replace(/\D/g, "").slice(0, 9);

  let result = "";

  if (value.length > 0) result = value.slice(0, 2);                 // 90
  if (value.length > 2) result += " " + value.slice(2, 5);          // 123
  if (value.length > 5) result += " " + value.slice(5, 7);          // 45
  if (value.length > 7) result += " " + value.slice(7, 9);          // 67

  return result;
}


  async function handleRegister(e) {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);

    // ✅ Supabase için toza format
    const cleanPhone = "998" + phone.replace(/\D/g, "");

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (existingUser) {
        localStorage.setItem("userId", existingUser.id);
        localStorage.setItem("userPhone", existingUser.phone);
        navigate("/my-houses", { replace: true });
        return;
      }

      const { data: newUser } = await supabase
        .from("users")
        .insert([{ name, phone: cleanPhone }])
        .select()
        .single();

      localStorage.setItem("userId", newUser.id);
      localStorage.setItem("userPhone", newUser.phone);
      navigate("/my-houses", { replace: true });
    } catch (err) {
      alert("Xatolik: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="reg-wrapper">
      <div className="reg-box">
        <h1 className="reg-title">🏡 Ro‘yxatdan o‘tish / Kirish</h1>

        <form onSubmit={handleRegister} className="reg-form">
          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="reg-input"
          />

          {/* ✅ +998 belgilangan holda telefon input */}
          <div className="reg-input phone-input-wrapper">
            <span className="phone-prefix">+998</span>
            <input
              type="tel"
              placeholder="90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              required
              className="phone-input"
            />
          </div>

          <label className="reg-offer-check">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <span>
              Men <a href="/oferta-rent">Ommaviy Oferta</a> shartlarini qabul qilaman
            </span>
          </label>

          <button type="submit" disabled={loading || !agreed} className="reg-btn">
            {loading ? "⏳ Kuting..." : "Davom etish"}
          </button>
        </form>

        <p className="reg-desc">
          Agar raqam avval ro‘yxatdan o‘tgan bo‘lsa — siz avtomatik tizimga kirasiz ✅
        </p>
      </div>
    </div>
  );
}
