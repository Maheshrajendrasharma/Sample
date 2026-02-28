import { useState } from "react";
import services from "../data/services";
import {  useEffect } from "react";


export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",  
    location: "",
    message: "",
  });


  useEffect(() => {
  const savedLocation = localStorage.getItem("selectedLocation");

  if (savedLocation) {
    setForm((prev) => ({
      ...prev,
      location: savedLocation,
    }));
  }
}, []);
  const [errors, setErrors] = useState({});

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
  } 
  else if (value.length < 10) {
    error = "Enter 10-digit mobile number";
  } 
  else if (!/^[6-9]\d{9}$/.test(value)) {
    error = "Mobile number must start with 6, 7, 8, or 9";
  } 
  else {
    error = "";
  }
  break;


    case "service":
      if (!value) error = "Please select a service";
      break;

    case "location":
      if (!value) error = "Please select a location";
      break;

    case "message":
      if (value.length < 10)
        error = "Message must be at least 10 characters";
      break;

    default:
      break;
  }

  return error;
};


const handleChange = (e) => {
  const { name, value } = e.target;

  // Phone-specific handling
  if (name === "phone") {
    // If user types non-digits → show error
    if (!/^\d*$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Only numbers are allowed in mobile number",
      }));
      return;
    }
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: validateField(name, value),
  }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ MUST use FormData for Apps Script
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("service", form.service);
    formData.append("location", form.location);
    formData.append("message", form.message);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxn3tT_4cuEchjO1OnG2Ui4pE21V3oIipkmIWEpo_TnIiNp3wODe02LFg-0PFH3kAao/exec", // 🔴 replace with your LIVE exec URL
        {
          method: "POST",
          body: formData, // ✅ NO headers
        }
      );

      alert("Thank you! We will contact you shortly.");

      window.open(
        "https://wa.me/917738843841?text=Hi, I just submitted an enquiry on your website",
        "_blank"
      );

      setForm({
        name: "",
        phone: "",
        service: "",
        location: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    }
  };

  const isFormValid =
  Object.values(errors).every((err) => !err) &&
  Object.values(form).every((val) => val !== "");
<button type="submit" disabled={!isFormValid}>
  Submit Enquiry
</button>

return (
  <section className="w-full">
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}
      <div>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={10}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select a Service</option>

          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-sm mt-1">{errors.service}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <input
          name="location"
          placeholder="Your Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
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
