import Home from "./pages/Home";
import UyKerak from "./pages/UyKerak.jsx";
import IjarachiKerak from "./pages/IjarachiKerak";
import Register from "./pages/Register";
import MyHouses from "./pages/MyHouses";
import AddHouse from "./pages/AddHouse";
import MapSelect from "./pages/MapSelect.jsx";
import EditHouse from "./pages/EditHouse.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HouseDetails from "./pages/HouseDetails.jsx";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uy-kerak" element={<UyKerak />} />
        <Route path="/ijarachi-kerak" element={<IjarachiKerak />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-houses" element={<MyHouses />} />
        <Route path="/add-house" element={<AddHouse />} />
        <Route path="/map-select" element={<MapSelect />} />
        <Route path="/edit-house" element={<EditHouse />} />
        <Route path="/house-details/:id" element={<HouseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
