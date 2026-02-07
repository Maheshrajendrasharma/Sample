import { useState } from "react";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    city: "",
  });

  const submitBooking = () => {
    const message = `
Name: ${form.name}
Phone: ${form.phone}
Service: ${form.service}
City: ${form.city}
    `;
    window.open(
      `https://wa.me/919999999999?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <section id="booking">
      <h2>Book Your Service</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <input placeholder="Service" onChange={e => setForm({...form, service: e.target.value})} />
      <input placeholder="City" onChange={e => setForm({...form, city: e.target.value})} />

      <button onClick={submitBooking}>Book via WhatsApp</button>
    </section>
  );
};

export default BookingForm;
