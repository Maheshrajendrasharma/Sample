import UserLocationMap from "../UserLocationMap";
import ContactForm from "../ContactForm";

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
