import { useState, useEffect, useRef } from "react";
import { servicesData } from "../data/servicesData";
import Swal from "sweetalert2";
export default function ContactForm() {

  // 🔥 Flatten all services
  const allServices = servicesData.flatMap(category =>
    category.services.map(service => service.name)
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    services: [],   // ✅ changed to array
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [serviceInput, setServiceInput] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  


  // Load saved location
  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      setForm(prev => ({ ...prev, location: savedLocation }));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[A-Za-z ]{3,}$/.test(value))
          error = "Name must be at least 3 letters";
        break;

      case "phone":
        if (value.length === 0) {
          error = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = "Enter valid 10-digit mobile number";
        }
        break;

      case "services":
        if (value.length === 0)
          error = "Please select at least one service";
        break;

      case "location":
        if (!value) error = "Please enter location";
        break;

      case "message":
  if (value && value.length < 10)
    error = "Message must be at least 10 characters";
  break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setForm(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // 🔥 Toggle multi service
  const toggleService = (serviceName) => {
    const updated =
      form.services.includes(serviceName)
        ? form.services.filter(s => s !== serviceName)
        : [...form.services, serviceName];

    setForm(prev => ({ ...prev, services: updated }));

    setErrors(prev => ({
      ...prev,
      services: validateField("services", updated),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("service", form.services.join(", "));
    formData.append("location", form.location);
    formData.append("message", form.message);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxn3tT_4cuEchjO1OnG2Ui4pE21V3oIipkmIWEpo_TnIiNp3wODe02LFg-0PFH3kAao/exec",
        { method: "POST", body: formData }
      );

      Swal.fire({
  icon: "success",
  title: "Thank You!",
  text: "Your enquiry has been sent successfully. Our MyUrbanHelp team will contact you shortly.",
  confirmButtonText: "OK",
  confirmButtonColor: "#000",
});

      setForm({
        name: "",
        phone: "",
        services: [],
        location: "",
        message: "",
      });

    } catch {
      alert("Submission failed. Please try again.");
    }
  };

  const isFormValid =
  form.name &&
  form.phone &&
  form.services.length > 0 &&
  form.location &&
  !errors.name &&
  !errors.phone &&
  !errors.services &&
  !errors.location;



  const filteredServices = allServices
  .filter(service =>
    service.toLowerCase().includes(serviceInput.toLowerCase())
  )
  .filter(service => !form.services.includes(service));

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          maxLength={10}
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* 🔥 Service Search Selector */}
<div ref={dropdownRef} className="relative">

  <div className="border rounded-lg px-4 py-2 flex flex-wrap gap-2 min-h-[50px]">

    {form.services.map(service => (
      <div
        key={service}
        className="bg-black text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
      >
        {service}

        <span
          onClick={() => toggleService(service)}
          className="cursor-pointer"
        >
          ✕
        </span>

      </div>
    ))}

    <input
  type="text"
  placeholder="Type service..."
  className="flex-grow outline-none py-1"
  value={serviceInput}
  onFocus={() => setDropdownOpen(true)}
  onChange={(e) => {
    setServiceInput(e.target.value);
    setDropdownOpen(true);
    setHighlightIndex(-1);
  }}

  onKeyDown={(e) => {

  if (!dropdownOpen) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setHighlightIndex(prev =>
      prev < filteredServices.length - 1 ? prev + 1 : prev
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setHighlightIndex(prev =>
      prev > 0 ? prev - 1 : 0
    );
  }

  if (e.key === "Enter") {

    e.preventDefault(); // 🔥 stops form submit

    let selectedService;

    if (highlightIndex >= 0) {
      selectedService = filteredServices[highlightIndex];
    } else if (filteredServices.length > 0) {
      selectedService = filteredServices[0]; // 🔥 select first suggestion
    }

    if (selectedService) {
      toggleService(selectedService);
      setServiceInput("");
      setHighlightIndex(-1);
      setDropdownOpen(true); // keep dropdown active
    }

  }

}}
/>

  </div>

 {dropdownOpen && serviceInput && (
  <div className="absolute w-full bg-white border shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-50">

    {filteredServices.slice(0, 8).map((service, index) => (

      <div
        key={service}
        onClick={() => {
          toggleService(service);
          setServiceInput("");
          setDropdownOpen(false);
        }}
        className={`px-4 py-2 text-sm cursor-pointer ${
  highlightIndex === index
    ? "bg-gray-200"
    : "hover:bg-gray-100"
}`}
      >
        {service}
      </div>

    ))}

  </div>
)}

</div>

        {/* Location */}
        <input
          name="location"
          placeholder="Your Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}

        {/* Message */}
        <textarea
          name="message"
          placeholder="Message (Optional)"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isFormValid
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit Enquiry
        </button>

      </form>
    </section>
  );
}