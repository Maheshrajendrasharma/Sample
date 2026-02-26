import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategorySlider({ category, title, paused }) {
  const navigate = useNavigate();

  const imageCountMap = {
    beauty: 4,
    massage: 3,
    kitchen: 3,
    "household-repair": 5,
  };

  const images = Array.from(
    { length: imageCountMap[category] || 3 },
    (_, i) => `/sliderImages/${category}/${i + 1}.png`
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [paused, images.length]);

  return (
    <div
      onClick={() => navigate(`/${category}`)}
      className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer group"
    >
      {/* Image */}
      <img
        src={images[current]}
        alt={category}
        className="w-full h-full object-cover transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <h2 className="text-white text-xl font-semibold">
          {title}
        </h2>
      </div>
    </div>
  );
}