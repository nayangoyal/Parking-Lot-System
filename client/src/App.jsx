import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateParkingLot from './components/createParking/CreateParkingLot';
import ParkVehicle from './components/parkVehicle/ParkVehicle';
import LeaveVehicle from './components/leaveVehicle/LeaveVehicle';
import VehicleLocation from './components/vehicleLocation/VehicleLocation';
import ParkingOccupancy from './components/parkingOccupancy/ParkingOccupancy';
import AvailableSpots from './components/availableSpots/AvailableSpots';
import Navbar from "./components/navbar/Navbar";
import '../src/App.css';

function App() {
  return (
    <Router>
    <Navbar />
    {/* <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Parking Management System</h1> */}
      <div className='routerPart'>
      <Routes>
        <Route path="/" element={<CreateParkingLot />} />
        <Route path="/park" element={<ParkVehicle />} />
        <Route path="/leave" element={<LeaveVehicle />} />
        <Route path="/vehicle-location" element={<VehicleLocation />} />
        <Route path="/parking-lot" element={<ParkingOccupancy />} />
        <Route path="/available-spot" element={<AvailableSpots />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
