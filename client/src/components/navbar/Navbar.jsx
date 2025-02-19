// import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import external CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">🚗 Parking System</div>
      <ul className="nav-links">
        <li><Link to="/">Create Lot</Link></li>
        <li><Link to="/park">Park Vehicle</Link></li>
        <li><Link to="/leave">Leave Vehicle</Link></li>
        <li><Link to="/vehicle-location">Find Vehicle</Link></li>
        <li><Link to="/parking-lot">Occupancy</Link></li>
        <li><Link to="/available-spot">Available Spots</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
