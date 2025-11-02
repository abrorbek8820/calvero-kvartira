import './HomeSlide.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    const mode = localStorage.getItem("mode") || "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, []);

  const toggleMode = (mode) => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    localStorage.setItem("mode", mode);
    setShowThemeMenu(false);
  };

  const buttons = [
    { text: "ISHCHI KERAK", link: "/ishchi-kerak" },
    { text: "ISH KERAK", link: "/ishkerak" },
    { text: "IJARA UY KERAK", link: "/ijara-kerak" },
    { text: "IJARA BERISH", link: "/ijara-berish" },
  ];

  const handleClick = (index, link) => {
    setClickedIndex(index);
    setTimeout(() => navigate(link), 800);
  };

  return (
    <div className="container">
      {/* Menyu */}
      <div className="menu-wrapper">
        <button
          className="menu-button"
          onClick={() => setShowThemeMenu(!showThemeMenu)}
        >
          ☰
        </button>

        {showThemeMenu && (
          <div className="theme-menu active">
            <div onClick={() => toggleMode("light")}>🌞 KUNGI REJIM</div>
            <div onClick={() => toggleMode("dark")}>🌙 TUNGI REJIM</div>
          </div>
        )}
      </div>

      {/* Sarlavha */}
      <div className="title-wrapper">
        <h1 className="title">CALVERO <span className="sub">PLATFORM</span></h1>
      </div>

      {/* Tugmalar */}
      <div className
