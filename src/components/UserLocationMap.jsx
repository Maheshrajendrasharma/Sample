import { useEffect, useState } from "react";

function UserLocationMap() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setError("Location permission denied");
      }
    );
  }, []);

  // ✅ SHOW LOADING STATE
  if (!location && !error) {
    return (
      <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">Detecting your location...</p>
      </div>
    );
  }

  // ✅ SHOW ERROR STATE
  if (error) {
    return (
      <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // ✅ SAFE RENDER
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
      <iframe
        src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

export default UserLocationMap;