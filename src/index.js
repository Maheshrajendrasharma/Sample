import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Hide loader after React mounts
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}, 800);