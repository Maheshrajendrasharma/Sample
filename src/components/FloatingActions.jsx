function FloatingActions() {
  const phoneNumber = "917738843841"; // replace
  const whatsappMessage =
    "Hello, I would like to book a spa appointment.";

  return (
    <>
        

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
      >
      
      </a>
    </>
  );
}

export default FloatingActions;
