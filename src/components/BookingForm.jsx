import { useState, useRef } from "react";
import { servicesData } from "../data/servicesData";
const inputRef = useRef(null);
const BookingForm = () => {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: ""
  });

  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Flatten services list
  const allServices = servicesData.flatMap(category =>
    category.services.map(service => service.name)
  );

  const addService = (e) => {

  if (e.key === "Enter") {

    e.preventDefault();

    const value = serviceInput.trim();

    if (value && !services.includes(value)) {
      setServices([...services, value]);
    }

    setServiceInput("");
  }
};

  const removeService = (service) => {
    setServices(services.filter((s) => s !== service));
  };

  const submitBooking = () => {

    const message = `
Name: ${form.name}
Phone: ${form.phone}
Services: ${services.join(", ")}
City: ${form.city}
    `;

    window.open(
      `https://wa.me/919999999999?text=${encodeURIComponent(message)}`
    );
  };

  const filteredServices = allServices.filter(service =>
    service.toLowerCase().includes(serviceInput.toLowerCase())
  );

  return (
    <section className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Send Us an Enquiry
      </h2>

      {/* NAME */}
      <input
        type="text"
        placeholder="Your Name"
        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* PHONE */}
      <input
        type="text"
        placeholder="Phone Number"
        className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      {/* SERVICE SELECTOR */}
      <div className="relative w-full mb-4">

        {/* SERVICE TAG INPUT */}
<div
  className="w-full mb-4 border rounded-lg p-2 flex flex-wrap gap-2 cursor-text"
  onClick={() => inputRef.current.focus()}
>

  {services.map((service, index) => (
    <span
      key={index}
      className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
    >
      {service}

      <button
        type="button"
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeService(service)}
      >
        ✕
      </button>
    </span>
  ))}

  <input
  ref={inputRef}
  type="text"
  placeholder="Type service and press Enter"
  value={serviceInput}
  onChange={(e) => setServiceInput(e.target.value)}
  onKeyDown={addService}
  className="flex-grow min-w-[150px] outline-none p-1"
/>

</div>
        {/* SUGGESTIONS */}
        {showSuggestions && serviceInput && (

          <div className="absolute w-full bg-white border rounded-lg shadow mt-1 max-h-40 overflow-y-auto z-50">

            {filteredServices.slice(0, 8).map((service, index) => (

              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {

                  if (!services.includes(service)) {
                    setServices([...services, service]);
                  }

                  setServiceInput("");
                  setShowSuggestions(false);
                }}
              >
                {service}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* CITY */}
      <input
        type="text"
        placeholder="City"
        className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      {/* BUTTON */}
      <button
        onClick={submitBooking}
        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg"
      >
        Submit Enquiry
      </button>

    </section>
  );
};

export default BookingForm;