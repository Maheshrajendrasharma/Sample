import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ IMPORT IMAGES (important for GitHub Pages)
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const images = [slide1, slide2, slide3];

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="home-slider">
      <Slider {...settings}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Service slide ${i + 1}`}
            className="slider-image"
          />
        ))}
      </Slider>
    </div>
  );
}