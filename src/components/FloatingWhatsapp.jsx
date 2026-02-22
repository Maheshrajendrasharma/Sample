import { useState, useRef } from "react";

function FloatingWhatsapp() {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const dragging = useRef(false);

  const handleMouseDown = () => {
    dragging.current = true;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      setPosition({
        x: window.innerWidth - e.clientX - 40,
        y: window.innerHeight - e.clientY - 40,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (dragging.current) {
      const touch = e.touches[0];
      setPosition({
        x: window.innerWidth - touch.clientX - 40,
        y: window.innerHeight - touch.clientY - 40,
      });
    }
  };

  return (
    <a
      href="https://wa.me/917738843841"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      className="fixed z-50 bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg transition duration-300 cursor-grab active:cursor-grabbing"
      style={{
        bottom: `${position.y}px`,
        right: `${position.x}px`,
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-6 h-6"
      />
    </a>
  );
}

export default FloatingWhatsapp;