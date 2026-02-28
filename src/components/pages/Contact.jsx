import UserLocationMap from "../UserLocationMap";
import ContactForm from "../ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-10">

      {/* Page Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact & Enquiry
        </h1>
        <p className="text-gray-600 mt-3">
          Get in touch with My Urban Help for premium at-home services across Mumbai.
        </p>
      </div>

      {/* Map + Form Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 📍 MAP SECTION */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            📍 Our Service Area
          </h2>
          <div className="rounded-xl overflow-hidden">
            <UserLocationMap />
          </div>
        </div>

        {/* 📩 FORM SECTION */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            📩 Send Us an Enquiry
          </h2>
          <ContactForm />
        </div>

      </div>

    </div>
  );
}