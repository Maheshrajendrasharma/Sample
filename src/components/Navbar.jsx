  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { servicesData } from "../data/servicesData";
  import { serviceAreas } from "../data/serviceAreas";


  import { Menu, MapPin, Search, ShoppingCart, User } from "lucide-react";

  function Navbar() {

    // ✅ STEP 3 — ADD HERE (Inside component, above return)
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [serviceStatus, setServiceStatus] = useState("");
    const [locationName, setLocationName] = useState("Detecting...");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);  
    //const [isEditingLocation, setIsEditingLocation] = useState(false);
    //const [inputLocation, setInputLocation] = useState("");

  

useEffect(() => {
  if (!locationName) return;

  const isAvailable = serviceAreas.some(area =>
    locationName.toLowerCase().includes(
      area.toLowerCase().split(",")[0]
    )
  );

  setServiceStatus(
    isAvailable
      ? "Service Available in your area"
      : "Service Coming Soon in your area"
  );
}, [locationName]);

    const handleSearch = (value) => {
      
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }



    const searchTerm = value.toLowerCase();

    // 🔥 Flatten category + services
    const flattenedServices = servicesData.flatMap(category =>
      category.services.map(service => ({
        name: service,
        category: category.category,
        id: service.replace(/\s+/g, "-").toLowerCase()
      }))
    );

    // 🔥 Filter services
    const filtered = flattenedServices.filter(service =>
      service.name.toLowerCase().includes(searchTerm)
    );

    setResults(filtered.slice(0, 8)); // limit results
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(word =>  
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };


  
useEffect(() => {

  if (!navigator.geolocation) {
    setLocationName("Location not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.state_district ||
          "";

        const suburb =
          data.address.suburb ||
          data.address.neighbourhood ||
          "";

        const fullLocation = `${suburb}, ${city}`;
        setLocationName(fullLocation);

      } catch {
        setLocationName("Unable to detect");
      }
    },
    () => {
      setLocationName("Select location");
    }
  );

}, []);

  


  const [defaultLocation] = useState("");

  const selectLocation = (area) => {
    setLocationName(area);
    setLocationSuggestions([]);
    localStorage.setItem("selectedLocation", area);

    const isAvailable = serviceAreas.some(area =>
  locationName.toLowerCase().includes(area.toLowerCase().split(",")[0])
);
    setServiceStatus(
      isAvailable
        ? "Service Available in your area"
        : "Service Coming Soon in your area"
    );

    setActiveIndex(-1);
  };

    return (
      <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        
        {/* Navbar Container */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-6">

            <div className="md:hidden">
              <Menu size={24} />
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-black text-white px-2 py-1 rounded font-bold">
                UC
              </div>
              <span className="font-semibold text-lg hidden sm:block">
                MY Urban Help
              </span>
            </div>

            <div className="hidden md:flex gap-6 text-gray-700 font-medium">
              <span className="cursor-pointer hover:text-black">Revamp</span>
              <span className="cursor-pointer hover:text-black">Native</span>
              <span className="cursor-pointer hover:text-black">Beauty</span>
            </div>
          </div>

          {/* CENTER SECTION */}
          <div className="relative flex items-center gap-2 border rounded-lg px-4 py-2 w-2/3 bg-white">

    <MapPin size={18} />

    <input
    type="text"
    value={locationName}

    onChange={(e) => {
      const value = e.target.value;

      if (!value.trim()) {
        setLocationName("");
        setLocationSuggestions([]);
        return;
      }

      const formatted = toTitleCase(value);
      setLocationName(formatted);

      const filtered = serviceAreas.filter(area =>
        area.toLowerCase().includes(value.toLowerCase())
      );

      setLocationSuggestions(filtered);
      setActiveIndex(-1);
    }}
    onKeyDown={(e) => {


      if (e.key === "Backspace") {
    e.preventDefault();

    const words = locationName.trim().split(" ");
    words.pop();

    const newValue = words.join(" ");
    setLocationName(newValue);

    const filtered = serviceAreas.filter(area =>
      area.toLowerCase().includes(newValue.toLowerCase())
    );

    setLocationSuggestions(filtered);
    setActiveIndex(-1);

    return; // stop further execution
  }

      

    if (locationSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < locationSuggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : locationSuggestions.length - 1
      );
    }

    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();

      const selected =
        activeIndex >= 0
          ? locationSuggestions[activeIndex]
          : locationSuggestions[0]; // nearest match

      setLocationName(selected);
      setLocationSuggestions([]);
      localStorage.setItem("selectedLocation", selected);

      const isAvailable = serviceAreas
        .map(a => a.toLowerCase())
        .includes(selected.toLowerCase());

      setServiceStatus(
        isAvailable
          ? "Service Available in your area"
          : "Service Coming Soon in your area"
      );

      setActiveIndex(-1);
    }
  }}



    onBlur={() => {
    if (!locationName.trim()) {
      setLocationName(defaultLocation);
      return;
    }

    const isAvailable = serviceAreas.some(area =>
  locationName.toLowerCase().includes(area.toLowerCase().split(",")[0])
);

    setServiceStatus(
      isAvailable
        ? "Service Available in your area"
        : "Service Coming Soon in your area"
    );
  }}

    className="text-sm outline-none w-full"
  />

    {/* Dropdown Suggestions */}
    {locationSuggestions.length > 0 && (
      <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border z-50">
        
        {locationSuggestions.map((area, index) => (
    <div
      key={index}
      onClick={() => selectLocation(area)}
      className={`px-4 py-2 cursor-pointer text-sm ${
        index === activeIndex
          ? "bg-gray-200"
          : "hover:bg-gray-100"
      }`}
    >
      {area}
    </div>
  ))}

      </div>
    )}

  </div>

  {serviceStatus && (
    <div
      className={`text-xs mt-1 ${
        serviceStatus.includes("Available")
          ? "text-green-600"
          : "text-red-500"
      }`}
    >
      {serviceStatus}
    </div>
  )}



            {/* Search */}
            <div className="relative flex items-center gap-2 border rounded-lg px-4 py-2 w-[80%] bg-white">
              <Search size={18} />

              <input
                type="text"
                value={query}
                
              onChange={(e) => {
    handleSearch(e.target.value);
  }}

                placeholder="Search for services"
                className="outline-none w-full text-sm"
              />

              {/* 🔽 Search Results Dropdown */}
              
              {results.length > 0 && (
    <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 border">
      {results.map(service => (
        <div
          key={service.id}
          onClick={() => {
    const categorySlug = service.category
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(`/category/${categorySlug}`);

    setQuery("");
    setResults([]);
  }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
        >
          <div className="font-medium">{service.name}</div>
          <div className="text-xs text-gray-500">{service.category}</div>
        </div>
      ))}
    </div>
  )}

            </div>
          
          </div>

          {/* RIGHT SECTION */}
  <div className="flex items-center gap-6">

    {/* Cart */}
    <div className="relative cursor-pointer">
      <ShoppingCart size={22} />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
        1
      </span>
    </div>

    {/* Account */}
    <button
      onClick={() => navigate("/login")}
      className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-black hover:text-white transition"
    >
      <User size={18} />
      Login
    </button>

  </div>
      
      </header>
    );
  }

  export default Navbar;
