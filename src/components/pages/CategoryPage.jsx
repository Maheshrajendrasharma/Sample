import { useParams } from "react-router-dom";
import { servicesData } from "../../data/servicesData";

function CategoryPage() {
  const { categorySlug } = useParams();

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
        
        {categoryData.services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">
              {service}
            </h3>

            <p className="text-sm text-gray-500">
              Starting from ₹499
            </p>

            <div className="mt-3 text-yellow-500">
              ⭐ 4.5
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default CategoryPage;