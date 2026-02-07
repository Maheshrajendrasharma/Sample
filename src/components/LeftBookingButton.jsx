function LeftBookingButton() {
  return (
    <div className="left-booking">
      <div className="left-booking-btn">
        Book Now
      </div>

      <div className="left-booking-dropdown">
        <a href="/contact">Book via Form</a>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book on WhatsApp
        </a>
        <a href="tel:+917738843841">Call Now</a>
      </div>
    </div>
  );
}

export default LeftBookingButton;
