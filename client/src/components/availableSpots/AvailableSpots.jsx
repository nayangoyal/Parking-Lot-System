import { useState } from "react";
import "./availableSpots.css";

const AvailableSpots = () => {
    const [vehicleType, setVehicleType] = useState("car");
    const [availableSpots, setAvailableSpots] = useState([]);
    const [message, setMessage] = useState("");

    const fetchAvailableSpots = async () => {
        try {
            const response = await fetch(`https://parking-lot-system.onrender.com/parking/available-spots?type=${vehicleType}`);
            const data = await response.json();

            if (data.availableSpots && data.availableSpots.length > 0) {
                setAvailableSpots(data.availableSpots);
                setMessage("");
            } else {
                setAvailableSpots([]);
                setMessage(data.message);
            }
        } catch (error) {
            setAvailableSpots([]);
            setMessage("Error fetching data. Please try again.");
            console.log(error);
            
        }
    };

    return (
        <div className="container">
            <h2>Check Available Parking Spots</h2>
            <div className="input-group">
                <label>Vehicle Type:</label>
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="select">
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                </select>
            </div>
            <button onClick={fetchAvailableSpots} className="button">Find Spots</button>

            <div id="result">
                {message && <p className="error">{message}</p>}
                {availableSpots.length > 0 && (
                    <ul>
                        {availableSpots.map((spot, index) => (
                            <li key={index}>
                                {vehicleType === "truck"
                                    ? `Floor ${spot.floorNumber}: Spots ${spot.spots.join(", ")}`
                                    : `Floor ${spot.floorNumber}: Spot ${spot.spotNumber}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AvailableSpots;
