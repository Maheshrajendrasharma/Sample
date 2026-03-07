import { useState } from "react";
import Swal from "sweetalert2";

function BecomePartner() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    experience: "",
    location: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("service", form.service);
    formData.append("experience", form.experience);
    formData.append("location", form.location);
    formData.append("message", form.message);

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbzk4_MNlVIITvSEZ-rk3opKzHcxSXOugn3mfnhZgFhC5VKrPaaJpdPxYfDt5TjPO7gvaA/exec",
        { method: "POST", body: formData }
      );

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Our team will contact you shortly.",
        confirmButtonColor: "#000"
      });

      setForm({
        name: "",
        phone: "",
        service: "",
        experience: "",
        location: "",
        message: ""
      });

    } catch {
      alert("Submission failed");
    }
  };

  return (
    <div className="pt-28 px-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Become a Partner
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="service"
          placeholder="Service you provide (Electrician, Cleaning etc)"
          value={form.service}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="location"
          placeholder="Service Area / City"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="message"
          placeholder="Tell us about your service"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Submit Application
        </button>

      </form>
    </div>
  );
}

export default BecomePartner;