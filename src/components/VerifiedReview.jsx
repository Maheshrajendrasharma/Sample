import { useState } from "react";
import { FaStar, FaCheckCircle, FaUserSecret } from "react-icons/fa";

const reviewsData = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Full Home Deep Cleaning",
    rating: 5,
    comment: "Amazing service. Very professional team!",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    service: "AC Repair & Installation",
    rating: 4,
    comment: "Quick and reliable service.",
    verified: true,
  },
  {
    id: 3,
    name: "Anonymous",
    service: "Haircut at Home",
    rating: 5,
    comment: "Loved the experience. Will book again!",
    verified: false,
    anonymous: true,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    service: "Plumber Service",
    rating: 3,
    comment: "Good but slightly delayed.",
    verified: false,
  },
];

function VerifiedReview() {
  const [filter, setFilter] = useState("all");

  const filteredReviews =
    filter === "all"
      ? reviewsData
      : filter === "verified"
      ? reviewsData.filter((r) => r.verified)
      : reviewsData.filter((r) => !r.verified);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        ⭐ Customer Reviews
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
        >
          All
        </button>
        <button
          onClick={() => setFilter("verified")}
          className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
        >
          Verified
        </button>
        <button
          onClick={() => setFilter("unverified")}
          className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
        >
          Unverified
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {review.anonymous ? (
                  <>
                    <FaUserSecret className="text-gray-500" />
                    Anonymous
                  </>
                ) : (
                  review.name
                )}
              </h3>

              {review.verified && (
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <FaCheckCircle />
                  Verified
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Service: {review.service}
            </p>

            <div className="flex mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VerifiedReview;