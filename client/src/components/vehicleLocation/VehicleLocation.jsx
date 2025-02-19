import { useState } from "react";
import "./VehicleLocation.css";

const VehicleLocation = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [type, setType] = useState("Car");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://parking-lot-system-p91t.vercel.app/parking/vehicleLocation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ licensePlate, type }),
    });
    const data = await response.json();
    if (response.ok) {
      setLocation(data);
      setMessage("");
    } else {
      setLocation(null);
      setMessage(data.message);
    }
  };

  return (
    <div className="container">
      <h2>Find Vehicle Location</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          className="input"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Truck">Truck</option>
        </select>
        <button type="submit" className="button">
          Find Location
        </button>
      </form>
      {location && (
        <div className="result">
          <h3>Vehicle Location</h3>
          <p>Floor: {location.floorNumber}</p>
          <p>
            Spot{Array.isArray(location.spots) ? "s" : ""}:{" "}
            {Array.isArray(location.spots) ? location.spots.join(", ") : location.spotNumber}
          </p>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VehicleLocation;
