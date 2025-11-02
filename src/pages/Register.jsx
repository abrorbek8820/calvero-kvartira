import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { applyTheme } from "../lib/theme";
import "../styles/register-theme.css"; // 👉 yangi CSS fayl

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    applyTheme();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

      if (existingUser) {
        localStorage.setItem("userId", existingUser.id);
        localStorage.setItem("userPhone", existingUser.phone);
        navigate("/my-houses");
        return;
      }

      const { data: newUser } = await supabase
        .from("users")
        .insert([{ name, phone }])
        .select()
        .single();

      localStorage.setItem("userId", newUser.id);
      localStorage.setItem("userPhone", newUser.phone);
      navigate("/my-houses");
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

          <input
            type="tel"
            placeholder="Raqam (+998901234567)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="reg-input"
          />

          <button type="submit" disabled={loading} className="reg-btn">
            {loading ? "⏳ Kuting..." : "Davom etish"}
          </button>
        </form>

        <p className="reg-desc">
          Agar raqam avval ro‘yxatdan o‘tgan bo‘lsa, siz avtomatik tarzda tizimga kirasiz.
        </p>
      </div>
    </div>
  );
}
