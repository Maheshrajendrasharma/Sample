import { useEffect, useState } from "react";

const slides = [
  {
    image: "/slider/slide1.jpg",
    title: "Bridal Mehendi Service",
    subtitle: "Elegant designs at your doorstep",
  },
  {
    image: "/slider/slide2.jpg",
    title: "Salon at Home",
    subtitle: "Professional beauty services",
  },
  {
    image: "/slider/slide3.jpg",
    title: "Luxury Spa Experience",
    subtitle: "Relax, refresh and rejuvenate",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
      {slides.map((slide, i) => {
        let className = "hero-slide";
        if (i === index) className += " active";
        else if (i === (index - 1 + slides.length) % slides.length)
          className += " prev";

        return (
          <div
            key={i}
            className={className}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HeroSlider;
