import { useState } from "react";
import services from "../data/services";



export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

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
    <section className="contact-form-section">
      <h2>📩 Enquiry Form</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}


                <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={10}
        />

        {errors.phone && <span className="error">{errors.phone}</span>}



        <select
  name="service"
  value={form.service}
  onChange={handleChange}
  required
>
  <option value="">Select a Service</option>

  {services.map((service, index) => (
    <option key={index} value={service}>
      {service}
    </option>
  ))}
</select>

{errors.service && <span className="error">{errors.service}</span>}



        <input
          name="location"
          placeholder="Your Location"
          value={form.location}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Submit Enquiry</button>
      </form>
    </section>
  );
}
