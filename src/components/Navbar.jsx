import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";

import { Menu, MapPin, Search, ShoppingCart, User } from "lucide-react";

function Navbar() {

  // ✅ STEP 3 — ADD HERE (Inside component, above return)
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
              Urban Company
            </span>
          </div>

          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <span className="cursor-pointer hover:text-black">Revamp</span>
            <span className="cursor-pointer hover:text-black">Native</span>
            <span className="cursor-pointer hover:text-black">Beauty</span>
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-center max-w-2xl">

          {/* Location */}
          <div className="flex items-center gap-2 border rounded-lg px-4 py-2 w-64">
            <MapPin size={18} />
            <span className="truncate text-sm">
              1201, Cliff Ave...
            </span>
          </div>

          {/* Search */}
          <div className="relative flex items-center gap-2 border rounded-lg px-4 py-2 flex-1 bg-white">
            <Search size={18} />

            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
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
          navigate(`/services/${service.id}`);
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

          <div className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              1
            </span>
          </div>

          <User size={22} />

        </div>

      </div>
    </header>
  );
}

export default Navbar;
