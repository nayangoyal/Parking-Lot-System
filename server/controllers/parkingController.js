const { Vehicle } = require('../models/vehicle.model');
const { Floor } = require('../models/floor.model');

class VehicleController {
  static async parkVehicle(req, res) {
    try {
      const { licensePlate, type } = req.body;
      const existingVehicle = await Vehicle.findOne({ licensePlate });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle already parked' });
      }

      const vehicle = new Vehicle({ licensePlate, type });
      const floors = await Floor.find().populate('spots');
      
      for (let floor of floors) {
        const spots = floor.spots;
        if (type === 'Truck') {
          for (let i = 0; i < spots.length - 1; i++) {
            if (!spots[i].isOccupied && !spots[i + 1].isOccupied) {
              spots[i].isOccupied = true;
              spots[i].vehicle = vehicle._id;
              spots[i + 1].isOccupied = true;
              spots[i + 1].vehicle = vehicle._id;
              
              await vehicle.save();
              await spots[i].save();
              await spots[i + 1].save();

              return res.status(200).json({
                message: 'Truck parked successfully',
                floor: floor.floorNumber,
                spots: [spots[i].spotNumber, spots[i + 1].spotNumber]
              });
            }
          }
        } else {
          for (let spot of spots) {
            if (!spot.isOccupied) {
              spot.isOccupied = true;
              spot.vehicle = vehicle._id;
              
              await vehicle.save();
              await spot.save();
              return res.status(200).json({
                message: 'Vehicle parked successfully',
                floor: floor.floorNumber,
                spot: spot.spotNumber
              });
            }
          }
        }
      }

      res.status(404).json({ message: 'No available spot' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = { VehicleController };
