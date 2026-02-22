import { useNavigate } from "react-router-dom";
import services from "../data/3x3GridService";

export default function HomeServiceIcons() {
  const navigate = useNavigate();

  return (
    <div className="
  bg-white 
  p-4 md:p-5 
  rounded-2xl 
  shadow-sm 
  lg:max-w-md 
  flex flex-col 
  items-center
">
      <h2 className="text-3xl font-semibold mb-4">
        Home services at your doorstep
      </h2>

      <p className="text-lg mb-6 text-gray-600">
        What are you looking for?
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 
                max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
  {services.map((service) => {
    const IconComponent = service.icon;

    return (
      <div
        key={service.id}
        onClick={() => navigate(service.link)}
        className="
          bg-gray-100 
          rounded-xl 
          aspect-square
          flex flex-col 
          items-center 
          justify-center 
          text-center 
          cursor-pointer 
          hover:shadow-md 
          hover:scale-105 
          transition duration-300 
          p-2
          md:p-3
        "
      >
        <IconComponent className="text-2xl md:text-3xl text-purple-600 mb-2" />

        <p className="text-[11px] md:text-xs font-medium leading-tight px-1">
          {service.title}
        </p>
      </div>
    );
  })}
</div>
    </div>
  );
}