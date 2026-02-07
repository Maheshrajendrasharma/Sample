import { useNavigate } from "react-router-dom";
import homeServices from "../data/homeServices";
import "../styles/main.css";

export default function HomeServiceIcons() {
  const navigate = useNavigate();

  return (
    <div className="home-icons-grid">
      {homeServices.map((service) => {
        const Icon = service.icon;

        return (
          <div
            key={service.id}
            className="service-icon-card"
            onClick={() => navigate(service.link)}
          >
            <Icon className="service-icon" />
            <p>{service.title}</p>
          </div>
        );
      })}
    </div>
  );
}
