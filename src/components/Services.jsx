function Services() {
  return (
    <section className="services">
      <h2 className="section-title">Our Services</h2>

      <div className="services-grid">
        <div className="service-card">
          <h3>Relaxing Massage</h3>
          <p>Full body massage for stress relief and relaxation.</p>
          <span className="price">₹1999</span>
        </div>

        <div className="service-card">
          <h3>Deep Tissue Massage</h3>
          <p>Target muscle pain and stiffness with deep pressure.</p>
          <span className="price">₹2499</span>
        </div>

        <div className="service-card">
          <h3>Facial & Skin Care</h3>
          <p>Glow-boosting facial treatments for healthy skin.</p>
          <span className="price">₹1499</span>
        </div>

        <div className="service-card">
          <h3>Luxury Spa Therapy</h3>
          <p>Premium spa experience at your home.</p>
          <span className="price">₹2999</span>
        </div>
      </div>
    </section>
  );
}

export default Services;
