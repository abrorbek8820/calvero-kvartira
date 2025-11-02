// src/lib/theme.js
export function applyTheme() {
  const params = new URLSearchParams(window.location.search);
  const modeFromUrl = params.get("mode");
  const mode = modeFromUrl || localStorage.getItem("mode") || "light";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(mode);

  localStorage.setItem("mode", mode);
  console.log("🌓 Applied custom theme:", mode);

  // Body uchun CSS o'zgaruvchilarni qo'llaymiz
  const root = document.documentElement;

  if (mode === "dark") {
    root.style.setProperty("--bg-color", "#1c1b1a");
    root.style.setProperty("--text-color", "#f3f3f3");
    root.style.setProperty("--card-bg", "#292826");
    root.style.setProperty("--highlight-bg", "#3d3b38");
    root.style.setProperty("--accent", "#ffb400");
  } else {
    root.style.setProperty("--bg-color", "#fff7cc");
    root.style.setProperty("--text-color", "#1a1a1a");
    root.style.setProperty("--card-bg", "#ffffff");
    root.style.setProperty("--highlight-bg", "#fff2a8");
    root.style.setProperty("--accent", "#d7263d");
  }
}
