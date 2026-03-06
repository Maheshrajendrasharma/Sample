import React, { useRef } from "react";
import { servicesData } from "../../data/servicesData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";



const SliderSection = ({ categoryData }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  
  
const navigate = useNavigate();


  
  return (
    <div className="relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
<h2 className="text-lg md:text-2xl font-semibold tracking-tight">          
  {categoryData.category}
        </h2>

        <button
  onClick={() => {
    const categorySlug = categoryData.category
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(`/category/${categorySlug}`);
  }}
  className="text-sm px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
>
  View All
</button>
      </div>

      {/* Arrow Buttons */}
      <button
  onClick={scrollLeft}
  className="hidden md:flex absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100"
>
  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
</button>

      <button
  onClick={scrollRight}
  className="hidden md:flex absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 md:p-3 rounded-full hover:bg-gray-100"
>
  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
</button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
      >
        {categoryData.services.map((service, i) => (
          <div
  key={i}
  onClick={() => {
    const categorySlug = categoryData.category
      .replace(/\s+/g, "-")
      .toLowerCase();

    const serviceSlug = service.name
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(`/service/${categorySlug}/${serviceSlug}`);
  }}
  className="min-w-[200px] md:min-w-[420px] bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition duration-300 overflow-hidden snap-start cursor-pointer"
>

  {/* Image */}
  <div className="relative w-full h-40 md:h-72 overflow-hidden">
    <img
      src={service.image}
      alt={service.name}
      loading="lazy"
      className="w-full h-full object-cover transition duration-500 hover:scale-[1.02]"
    />
  </div>

  {/* Content */}
  <div className="p-3 md:p-5">
    <h4 className="text-sm md:text-lg font-semibold">
      {service.name}
    </h4>

    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
      ⭐ 4.5 | ₹ Price
    </p>
  </div>

</div>
        ))}
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div className="w-full px-4 md:px-8 py-14 space-y-20">
      {servicesData.map((categoryData, index) => (
        <SliderSection
          key={index}
          categoryData={categoryData}
        />
      ))}
    </div>
  );
};

export default ServicesPage;