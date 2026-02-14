import { useParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";


function ServiceDetails() {
  const { id } = useParams();

  const service = servicesData.find(
    s => s.id === Number(id)
  );

  if (!service) {
    return <div className="mt-20 p-10">Service not found</div>;
  }

  return (
    <div className="mt-20 p-10">
      <h1 className="text-3xl font-semibold mb-4">
        {service.name}
      </h1>
      <p>Category: {service.category}</p>
      <p>Rating: ⭐ {service.rating}</p>
      <p className="text-xl font-bold mt-2">
        ₹ {service.price}
      </p>
    </div>
  );
}

export default ServiceDetails;
