import { useState } from "react";
import { applyTheme } from "../lib/theme";

export default function IjarachiKerak() {
  // Agar foydalanuvchi ro‘yxatdan o‘tgan bo‘lsa (hozircha test uchun)
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
  applyTheme();
}, []);

  // Foydalanuvchi e’lonlari (namuna ma’lumot)
  const [houses, setHouses] = useState([
    { id: 1, rooms: 3, city: "Toshkent", price: "2 000 000 so'm", active: true },
    { id: 2, rooms: 2, city: "Chilonzor", price: "1 500 000 so'm", active: false },
  ]);

  // Ro‘yxatdan o‘tish jarayoniga o‘tish (hozircha soxta)
  const handleRegister = () => {
    alert("Ro‘yxatdan o‘tish sahifasiga yo‘naltirilayapti...");
    setIsRegistered(true);
  };

  // Uy qo‘shish
  const handleAddHouse = () => {
    const newHouse = {
      id: houses.length + 1,
      rooms: 1,
      city: "Yangi uy",
      price: "Kelishilgan holda",
      active: true,
    };
    setHouses([...houses, newHouse]);
  };

  // Tahrirlash (keyinchalik modal orqali)
  const handleEdit = (id) => {
    alert(`Uy #${id} tahrirlanmoqda...`);
  };

  // Faollikni o‘zgartirish
  const handleToggleActive = (id) => {
    setHouses(
      houses.map((h) =>
        h.id === id ? { ...h, active: !h.active } : h
      )
    );
  };

  // O‘chirish
  const handleDelete = (id) => {
    if (confirm("Bu uyni o‘chirishni istaysizmi?")) {
      setHouses(houses.filter((h) => h.id !== id));
    }
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-50 px-5 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">🏡 Ijarachi kerak</h1>

      {!isRegistered ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-600 mb-3">Ro‘yxatdan o‘tmagan foydalanuvchi.</p>
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
          >
            Ro‘yxatdan o‘tish
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Mening uylarim ({houses.length})
            </h2>
            <button
              onClick={handleAddHouse}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
            >
              ➕ Uy qo‘shish
            </button>
          </div>

          {houses.map((house) => (
            <div
              key={house.id}
              className="bg-white rounded-xl shadow p-4 mb-3 border border-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-800 font-medium">
                    🏠 {house.rooms} xonali, {house.city}
                  </h3>
                  <p className="text-gray-500 text-sm">{house.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(house.id)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleToggleActive(house.id)}
                    className={`px-3 py-1 rounded-md ${
                      house.active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {house.active ? "🟢" : "⚪"}
                  </button>
                  <button
                    onClick={() => handleDelete(house.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    🗑️
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
