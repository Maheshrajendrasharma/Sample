import Slider from "react-slick";

const images = [
  "/slider/slide1.jpg",
  "/slider/slide2.jpg",
  "/slider/slide3.jpg",
];


export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="home-slider">
      {images.map((img, i) => (
        <img key={i} src={img} alt="Service banner" />
      ))}
    </Slider>
  );
}
