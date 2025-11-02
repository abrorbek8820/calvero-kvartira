import { useEffect, useState } from "react";
import { applyTheme } from "../lib/theme";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(applyTheme());

  // 🌙 Tema qo‘llash (URL yoki localStorage dan)
  useEffect(() => {
    applyTheme();
    setMode(applyTheme());
  }, []);

  const goTo = (path) => {
    const connector = path.includes("?") ? "&" : "?";
    navigate(`${path}${connector}mode=${mode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center gap-6 transition">
      <h1 className="text-2xl font-bold">🏠 Calvero Kvartira</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Ijara bo‘yicha barcha xizmatlar bir joyda
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-72 mt-4">
        {/* Uy kerak */}
        <button
          onClick={() => goTo("/uy-kerak")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow transition"
        >
          🏡 Uy kerak
        </button>

        {/* Uy berish */}
        <button
          onClick={() => goTo("/ijarachi-kerak")}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow transition"
        >
          👨‍👩‍👧‍👦 Uy berish
        </button>

        {/* Mening uylarim */}
        <button
          onClick={() => goTo("/my-houses")}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg shadow transition"
        >
          🏘️ Mening uylarim
        </button>

        {/* Orqaga (asosiy Calvero) */}
        <a
          href={`https://calvero.work?mode=${mode}`}
          className="bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg shadow text-center transition"
        >
          🔙 Calvero Platform
        </a>
      </div>
    </div>
  );
}
