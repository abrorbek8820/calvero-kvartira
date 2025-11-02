import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { regions } from "../data/regions";
import { applyTheme } from "../lib/theme";

export default function UyKerak3D() {
  const [houses, setHouses] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [target, setTarget] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedId, setZoomedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    applyTheme();
    loadHouses();
  }, []);

  async function loadHouses() {
    let query = supabase
      .from("houses")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: false });

    if (city) query = query.eq("city", city);
    if (district) query = query.eq("district", district);

    if (target) {
      query = query.in("target", [target, "farqi-yoq"]);
    }

    const { data, error } = await query;
    if (!error) setHouses(data || []);
  }

  useEffect(() => {
    loadHouses();
  }, [city, district, target]);

  useEffect(() => {
    const container = document.querySelector(".carousel");
    if (!container) return;
    const handleScroll = () => {
      const cards = Array.from(container.children);
      const scrollTop = container.scrollTop;
      const cardHeight = cards[0]?.clientHeight || 1;
      const index = Math.round(scrollTop / (cardHeight * 0.8));
      setActiveIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [houses]);

  const handleZoom = (id) => {
    setZoomedId(id);
    setTimeout(() => navigate(`/house-details/${id}`), 600);
  };

  // “Kimlar uchun” belgisi
  const targetIcons = {
    oila: "👨‍👩‍👧 Oilalarga",
    qizlar: "👩 Qizlarga",
    yigitlar: "👨 Yigitlarga",
    erkaklar: "🧔 Erkaklarga",
    ayollar: "👩‍🦱 Ayollarga",
    "farqi-yoq": "🌍 Hamma uchun",
  };

  return (
    <div className="carousel-wrapper">
      <h1 className="carousel-title">🏠 Calvero Uylar</h1>

      {/* 🔍 Filtrlar */}
      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setDistrict("");
          }}
        >
          <option value="">Viloyat</option>
          {Object.keys(regions).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {city && (
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Tuman</option>
            {regions[city].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}

        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="">Kimlar uchun</option>
          <option value="oila">Oilalarga</option>
          <option value="qizlar">Qizlarga</option>
          <option value="yigitlar">Yigitlarga</option>
          <option value="erkaklar">Erkaklarga</option>
          <option value="ayollar">Ayollarga</option>
        </select>
      </motion.div>

      {/* 🏘️ Kartalar */}
      <div className="carousel">
        <AnimatePresence initial={false}>
          {houses.map((h, i) => {
            const distance = Math.abs(i - activeIndex);
            const scale =
              zoomedId === h.id ? 1.2 : Math.max(0.85, 1 - distance * 0.1);
            const translateY = zoomedId === h.id ? -30 : distance * 20;
            const opacity =
              zoomedId === h.id ? 1 : Math.max(0.7, 1 - distance * 0.15);
            const zIndex = zoomedId === h.id ? 20 : 10 - distance;

            return (
              <motion.div
                key={h.id}
                layout
                className={`carousel-card ${
                  zoomedId === h.id ? "zoomed" : ""
                }`}
                style={{
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 18,
                }}
                onClick={() => handleZoom(h.id)}
              >
                {h.images && h.images.length > 0 ? (
                  <motion.img
                    src={h.images[0]}
                    alt="Uy rasmi"
                    className="carousel-img"
                    layoutId={`img-${h.id}`}
                  />
                ) : (
                  <div className="carousel-placeholder" />
                )}

                <h2>
                  {h.rooms}-xona, {h.city}
                </h2>
                <p>
                  {h.district} —{" "}
                  <span className="price">
                    {h.price.toLocaleString()}{" "}
                    {h.currency === "YE" ? "y.e." : "so‘m"}
                  </span>
                </p>

                {/* 🧭 Kimlar uchun */}
                <p className="target-tag">
                  {targetIcons[h.target] || "🌍 Hamma uchun"}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
