    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { servicesData } from "../data/servicesData";
    import { serviceAreas } from "../data/serviceAreas";


    import {MapPin, Search, ShoppingCart, User } from "lucide-react";

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
      const [searchActiveIndex, setSearchActiveIndex] = useState(-1);
      const [dynamicPlaceholder, setDynamicPlaceholder] = useState("");
      const [placeholderIndex, setPlaceholderIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);
      const [typingText, setTypingText] = useState("");
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    
useEffect(() => {

  if (!locationName || locationName === "Select location") {
    setServiceStatus("");
    return;
  }

  const isAvailable = serviceAreas.some(area =>
    locationName.toLowerCase().includes(
      area.toLowerCase().split(",")[0]
    )
  );

  setServiceStatus(
    isAvailable
      ? "Service Available"
      : "Service Coming Soon"
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

 
useEffect(() => {
  const text = "Type your service here";
  let index = 0;

  const typingInterval = setInterval(() => {
    setTypingText(text.slice(0, index + 1));
    index++;

    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, 80); // typing speed

  return () => clearInterval(typingInterval);
}, []);




  useEffect(() => {

  if (!servicesData || servicesData.length === 0) return;

  const allServices = servicesData.flatMap(category =>
    category.services
  );

  if (allServices.length === 0) return;

  const currentService =
    allServices[placeholderIndex % allServices.length];

  let typingSpeed = isDeleting ? 40 : 80;

  const timeout = setTimeout(() => {

    setDynamicPlaceholder(prev => {

      // Typing
      if (!isDeleting) {
        const nextText = currentService.substring(0, prev.length + 1);

        if (nextText === currentService) {
          setTimeout(() => setIsDeleting(true), 1000); // pause
        }

        return nextText;
      }

      // Deleting
      const nextText = currentService.substring(0, prev.length - 1);

      if (nextText === "") {
        setIsDeleting(false);
        setPlaceholderIndex(prev => prev + 1);
      }

      return nextText;
    });

  }, typingSpeed);

  return () => clearTimeout(timeout);

}, [dynamicPlaceholder, isDeleting, placeholderIndex]);

useEffect(() => {
  const text = "Type your service";
  let index = 0;

  const typingInterval = setInterval(() => {
    setTypingText(text.slice(0, index + 1));
    index++;

    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, 80); // typing speed

  return () => clearInterval(typingInterval);
}, []);  




    
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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
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

    



    const selectLocation = (area) => {
      setLocationName(area);
      setLocationSuggestions([]);
      localStorage.setItem("selectedLocation", area);

      const isAvailable = serviceAreas.some(a =>
    area.toLowerCase().includes(a.toLowerCase().split(",")[0])
  );
      setServiceStatus(
        isAvailable
          ? "Service Available"
          : "Service Coming Soon"
      );

      setActiveIndex(-1);
    };

      return (
        <header className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
          
          {/* Navbar Container */}
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 h-20">

              <div className="flex items-center gap-2">
                 <div

  onClick={() => {
    if (window.innerWidth < 768) {
      // Mobile behavior → toggle menu
      setMobileMenuOpen(prev => !prev);
    } else {
      // Desktop behavior → go home
      navigate("/");
    }
  }}
  className="flex items-center gap-2 cursor-pointer select-none"
>
  {/* Replace this with your actual logo image */}
  <img
    src="/logo.png"   // 🔥 Put your logo image path here
    alt="My Urban Help"
    className="h-10 w-auto"
  />

  <span className="font-semibold text-lg hidden sm:block">
    My Urban Help
  </span>
</div> 
                
              </div>

              <div className="hidden md:flex gap-6 text-gray-700 font-medium">
                <span className="cursor-pointer hover:text-black">Revamp</span>
                <span className="cursor-pointer hover:text-black">Native</span>
                <span className="cursor-pointer hover:text-black">Beauty</span>
              </div>
            
        {/* Location Box Wrapper */}
<div className="relative">

  {/* 📱 MOBILE — PIN ONLY */}
  <div className="flex md:hidden items-center justify-center border border-gray-300 rounded-full p-2 bg-white shadow-sm">
    <MapPin
      size={20}
      className={`${
        serviceStatus === "Service Available"
          ? "text-green-600 animate-pulse drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
          : serviceStatus === "Service Coming Soon"
          ? "text-red-500 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
          : "text-gray-400"
      }`}
    />
  </div>

  {/* 💻 DESKTOP — PIN + LOCATION TEXT */}
  <div className="hidden md:flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2.5 bg-white shadow-sm hover:shadow-md transition w-full">

    <MapPin
      size={18}
      className={`${
        serviceStatus === "Service Available"
          ? "text-green-600 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
          : serviceStatus === "Service Coming Soon"
          ? "text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
          : "text-gray-400"
      }`}
    />
<input
  type="text"
  value={locationName}
  onChange={(e) => {
    const value = e.target.value;
    setLocationName(value);
  }}
  onKeyDown={(e) => {

    if (locationSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev =>
        prev < locationSuggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev =>
        prev > 0 ? prev - 1 : locationSuggestions.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const selected =
        activeIndex >= 0
          ? locationSuggestions[activeIndex]
          : locationSuggestions[0];

      selectLocation(selected);
    }
  }}
  className="text-sm outline-none w-full"
/>

  


      

        {locationSuggestions.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
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



   

      {/* Status BELOW location */}
      {serviceStatus && (
  <div
    className={`hidden md:block text-xs mt-1 ml-1 font-medium ${
      serviceStatus.includes("Available")
        ? "text-green-600 animate-pulse drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
        : "text-red-500 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"
    }`}
  >
    {serviceStatus}
  </div>
)}

    </div>

    


              {/* Search */}
              

        {/* Search Section Wrapper */}
<div className="flex flex-col">

  {/* Search Input Box */}
  <div className="relative flex items-center gap-1 border border-gray-300 rounded-xl px-4 py-2.5 bg-white shadow-sm hover:shadow-md transition">

    <Search size={18} />

    <input
      type="text"
      value={query}
      onChange={(e) => {
        handleSearch(e.target.value);
        setSearchActiveIndex(-1);
      }}
      onKeyDown={(e) => {

        if (results.length === 0) return;

        // Arrow Down
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSearchActiveIndex(prev =>
            prev < results.length - 1 ? prev + 1 : 0
          );
        }

        // Arrow Up
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSearchActiveIndex(prev =>
            prev > 0 ? prev - 1 : results.length - 1
          );
        }

        // Enter Key
        if (e.key === "Enter") {
          e.preventDefault();

          const selected =
            searchActiveIndex >= 0
              ? results[searchActiveIndex]
              : results[0];

          const categorySlug = selected.category
            .replace(/\s+/g, "-")
            .toLowerCase();

          navigate(`/category/${categorySlug}`);

          setQuery("");
          setResults([]);
          setSearchActiveIndex(-1);
        }
      }}
      placeholder={query ? "" : dynamicPlaceholder}
      className="outline-none w-full text-sm"
    />

    {/* Dropdown Results */}
    {results.length > 0 && (
      <div className="absolute top-12 left-0 w-64 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 border">
        {results.map((service, index) => (
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
            className={`px-4 py-2 cursor-pointer text-sm ${
              index === searchActiveIndex
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-medium">{service.name}</div>
            <div className="text-xs text-gray-500">
              {service.category}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Animated Hint Text Below Search Box */}
  {!query && (
    <div className="text-xs text-gray-500 mt-1 ml-2 hidden md:block">
      {typingText}
    </div>
  )}

</div>


      {/* Cart */}
      <div className="hidden md:flex relative cursor-pointer items-center">
  <ShoppingCart size={22} />

  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
    1
  </span>
</div>
        

      {/* Account */}
      
    <button
  onClick={() => navigate("/login")}
  className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium hover:bg-black hover:text-white transition"
>
  <User size={20} />

  {/* Hide text on mobile */}
  <span className="hidden md:inline">
    Login
  </span>
</button>

  </div>

{/* Overlay (click outside to close) */}
{mobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setMobileMenuOpen(false)}
  />
)}

{/* Drawer */}
<div
  className={`fixed top-0 left-0 h-full w-2/8 min-w-[20px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden ${
    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="p-5 h-full flex flex-col">

    {/* Header with Close Button */}
    <div className="flex justify-between items-center border-b pb-4">

      <button
        onClick={() => setMobileMenuOpen(false)}
        className="text-gray-500 hover:text-black text-2xl font-light transition"
      >
        ✕
      </button>
    </div>

    {/* Menu Items */}
    <div className="mt-6 space-y-6 text-gray-700 font-medium">

      <div
        onClick={() => {
          navigate("/");
          setMobileMenuOpen(false);
        }}
        className="cursor-pointer hover:text-black"
      >
        Home
      </div>

      <div className="cursor-pointer hover:text-black">
        Revamp
      </div>

      <div className="cursor-pointer hover:text-black">
        Native
      </div>

      <div className="cursor-pointer hover:text-black">
        Beauty
      </div>

    </div>

  </div>
</div>



        
        </header>
      );
    }

    export default Navbar;
