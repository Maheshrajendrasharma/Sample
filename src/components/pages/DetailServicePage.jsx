  import { useParams, useNavigate } from "react-router-dom";
  import { servicesData } from "../../data/servicesData";

  function DetailServicePage() {
    const { categorySlug, serviceSlug } = useParams();
    const navigate = useNavigate();

    const categoryData = servicesData.find(cat =>
      cat.category.replace(/\s+/g, "-").toLowerCase() === categorySlug
    );

    if (!categoryData) {
      return <div className="pt-32 text-center text-2xl">Category not found</div>;
    }

    const selectedService = categoryData.services.find(service =>
      service.name.replace(/\s+/g, "-").toLowerCase() === serviceSlug
    );

    if (!selectedService) {
      return <div className="pt-32 text-center text-2xl">Service not found</div>;
    }

    return (
      <div className="pt-28 px-8 max-w-7xl mx-auto space-y-16">

        {/* 🔥 Main Detail Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="w-full rounded-2xl shadow-xl"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">
              {selectedService.name}
            </h1>

            <p className="text-gray-600 mb-6">
              Professional service delivered by trained experts at your doorstep.
            </p>

            <div className="text-yellow-500 text-lg mb-6">
              ⭐ 4.5 Rating
            </div>

            <button
  onClick={() =>
    navigate("/contact", {
      state: { service: selectedService.name }
    })
  }
  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
>
  Book Now
</button>
          </div>
        </div>

        {/* 🔥 Other Services Under Same Category */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            Other Services in {categoryData.category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryData.services
              .filter(service => service.name !== selectedService.name)
              .map((service, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const newSlug = service.name
                      .replace(/\s+/g, "-")
                      .toLowerCase();

                    navigate(`/service/${categorySlug}/${newSlug}`);
                  }}
                  className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold">
                      {service.name}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    );
  }

  export default DetailServicePage;