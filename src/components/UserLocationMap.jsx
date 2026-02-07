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

  return (
    <div className="map-container">
      <h2>📍 Your Location & Our Service Area</h2>
      <p>We provide at-home beauty & spa services near you</p>

      {location ? (
        <iframe
          title="User Location"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
        />
      ) : (
        <p>{error || "Detecting your location..."}</p>
      )}
    </div>
  );
}

export default UserLocationMap;
