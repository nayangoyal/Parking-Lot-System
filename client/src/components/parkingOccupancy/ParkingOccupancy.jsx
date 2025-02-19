import { useState } from 'react';
import axios from 'axios';
import './ParkingOccupancy.css';

const ParkingOccupancy = () => {
  const [floorNumber, setFloorNumber] = useState('');
  const [spotNumber, setSpotNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const checkOccupancy = async () => {
    if (!floorNumber) {
      setError('Please enter a floor number.');
      return;
    }

    setError(null);
    let url = `https://parking-lot-system-p91t.vercel.app/parking/floor/${floorNumber}/isFull`;
    if (spotNumber) {
      url += `?spotNumber=${spotNumber}`;
    }

    try {
      const response = await axios.get(url);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
      setResult(null);
    }
  };

  return (
    <div className="parking-container">
      <h2>Check Parking Occupancy</h2>
      <div className="input-group">
        <label>Floor Number:</label>
        <input 
          type="number" 
          value={floorNumber} 
          onChange={(e) => setFloorNumber(e.target.value)} 
          placeholder="Enter floor number" 
          className='input'
        />
      </div>
      <div className="input-group">
        <label className='label'>Spot Number (Optional):</label>
        <input 
          type="number" 
          value={spotNumber} 
          onChange={(e) => setSpotNumber(e.target.value)} 
          placeholder="Enter spot number (optional)" 
          className='input'
        />
      </div>
      <button onClick={checkOccupancy} className='button'>Check</button>
      
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          {spotNumber ? (
            <p>Spot {result.spotNumber} on Floor {result.floorNumber} is {result.isOccupied ? 'Occupied' : 'Available'}</p>
          ) : (
            <p>Floor {result.floorNumber} is {result.isFull ? 'Full' : 'Not Full'}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ParkingOccupancy;
