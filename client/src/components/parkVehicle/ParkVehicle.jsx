import { useState } from "react";
import "./ParkVehicle.css";

const ParkVehicle = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [type, setType] = useState("Car");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://parking-lot-system.onrender.com/parking/park", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ licensePlate, type }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h2>Park Vehicle</h2>
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
          Park Vehicle
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ParkVehicle;
