import React, { useRef, useEffect, useState } from "react";
import "../styles/ServicePage.css";

const ServiceSlider = ({ services, onScrollableChange }) => {
  const sliderRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const slider = sliderRef.current;
      if (slider) {
        const overflow = slider.scrollWidth > slider.clientWidth;
        setIsScrollable(overflow);
        if (onScrollableChange) {
          onScrollableChange(overflow);
        }
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [onScrollableChange]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="slider-wrapper">
      {isScrollable && (
        <button className="arrow left" onClick={scrollLeft}>
          ❮
        </button>
      )}

      <div className="slider" ref={sliderRef}>
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-image"></div>
            <h4>{service}</h4>
            <p>⭐ 4.5 | ₹ Price</p>
          </div>
        ))}
      </div>

      {isScrollable && (
        <button className="arrow right" onClick={scrollRight}>
          ❯
        </button>
      )}
    </div>
  );
};

export default ServiceSlider;
