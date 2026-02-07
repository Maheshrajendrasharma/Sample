import UserLocationMap from "../components/UserLocationMap";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="contact-page">
      
      {/* 📍 USER LOCATION MAP */}
      <UserLocationMap />

      {/* 📩 CONTACT FORM */}
      <ContactForm />

    </div>
  );
}
