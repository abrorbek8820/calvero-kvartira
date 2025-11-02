import { Link } from "react-router-dom";
import { useEffect } from "react";
import { applyTheme, toggleTheme, getTheme } from "../lib/theme";


export default function Home() {
  useEffect(() => {
    applyTheme(); // ilova ochilganda hozirgi holatni qo‘llaydi
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-gray-100">
      <div className="p-4">
      <button
        onClick={() => toggleTheme()}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Tema: {getTheme() === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
      <h1 className="text-2xl font-semibold mb-4">Calvero Home</h1>
      <div className="grid grid-cols-2 gap-4 w-64">
        <Link to="/ishchi-kerak" className="bg-blue-600 text-white py-3 rounded-lg text-center shadow">
          Ishchi kerak
        </Link>
        <Link to="/ish-kerak" className="bg-green-600 text-white py-3 rounded-lg text-center shadow">
          Ish kerak
        </Link>
        <Link to="/uy-kerak" className="bg-orange-500 text-white py-3 rounded-lg text-center shadow">
          Uy kerak
        </Link>
        <Link to="my-houses" className="bg-purple-600 text-white py-3 rounded-lg text-center shadow">
          Ijarachi kerak
        </Link>
      </div>
    </div>
  );
}
