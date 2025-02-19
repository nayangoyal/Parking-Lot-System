import { useState } from "react";
import axios from "axios";
import "./CreateParkingLot.css";

const CreateParkingLot = () => {
  const [numFloors, setNumFloors] = useState(2);
  const [spotsPerFloor, setSpotsPerFloor] = useState(2);
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (numFloors <= 0 || spotsPerFloor <= 0) {
      setMessage("Values must be greater than zero.");
      return;
    }

    try {
      const response = await axios.post("https://parking-lot-system.onrender.com/parking/create", {
        numFloors,
        spotsPerFloor,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error creating parking lot");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Create Parking Lot</h2>
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label>Number of Floors:</label>
            <input
              type="number"
              min="1"
              value={numFloors}
              onChange={(e) => setNumFloors(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Spots per Floor:</label>
            <input
              type="number"
              min="1"
              value={spotsPerFloor}
              onChange={(e) => setSpotsPerFloor(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="btn-submit">Create Parking Lot</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default CreateParkingLot;
