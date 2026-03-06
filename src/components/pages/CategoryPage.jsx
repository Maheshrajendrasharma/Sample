import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../../data/servicesData";

function CategoryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const categoryData = servicesData.find(cat =>
    cat.category.replace(/\s+/g, "-").toLowerCase() === categorySlug
  );

  if (!categoryData) {
    return (
      <div className="pt-32 text-center text-2xl">
        Category not found
      </div>
    );
  }

  return (
    <div className="pt-28 px-8 max-w-7xl mx-auto">

      {/* Category Title */}
      <h1 className="text-3xl font-bold mb-10">
        {categoryData.category}
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {categoryData.services.map((service) => (
          <div
            key={service.name}
            onClick={() => {
              const serviceSlug = service.name
                .replace(/\s+/g, "-")
                .toLowerCase();

              navigate(`/service/${categorySlug}/${serviceSlug}`);
            }}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer"
          >

            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {service.name}
              </h3>

              <p className="text-sm text-gray-500">
                Starting from ₹499
              </p>

              <div className="mt-2 text-yellow-500">
                ⭐ 4.5
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default CategoryPage;