import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/logo.png" alt="Urban Spa" />
        <span>URBAN BEAUTY & SPA</span>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Our Services</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Phone Pill */}
      <a href="tel:+917738843841" className="phone-pill">
        📞+91 7738843841
      </a>
    </header>
  );
}

export default Navbar;
