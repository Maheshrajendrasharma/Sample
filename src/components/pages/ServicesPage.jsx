import React from "react";
import { servicesData } from '../../data/servicesData';
import '../../styles/ServicePage.css';


const ServicesPage = () => {
  return (
    <div className="services-container">
      {servicesData.map((categoryData, index) => (
        <div key={index} className="category-section">
          <div className="category-header">
            <h2>{categoryData.category}</h2>
            <button className="view-all-btn">View All</button>
          </div>

          <div className="slider">
            {categoryData.services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-image">
                  {/* Add Image Here Later */}
                </div>
                <h4>{service}</h4>
                <p>⭐ 4.5 | ₹ Price</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesPage;
