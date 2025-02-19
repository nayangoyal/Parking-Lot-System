const { Vehicle } = require('../models/vehicle.model');
const { Floor } = require('../models/floor.model');
const {Spot} = require('../models/spot.model');

class VehicleController {
  static async leaveVehicle(req, res) {
    try {
      const { licensePlate, type } = req.body;
      const vehicle = await Vehicle.findOne({ licensePlate, type });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      if (type === 'Truck') {
        const spot = await Spot.findOne({vehicle: vehicle._id, isOccupied: true});
        const floor = await Floor.findOne({ spots: spot._id }).populate({
          path: 'spots',
          model: 'Spot',
        });
      
        
        console.log('Floor Found:', floor);
      
        if (!floor) {
          return res.status(404).json({ message: 'Vehicle not parked' });
        }
      
        const spots = floor.spots.sort((a, b) => a.spotNumber - b.spotNumber);
      
        
        console.log('Sorted Spots:', spots);
        for (let i = 0; i < spots.length - 1; i++) {
          console.log(`Checking spots ${spots[i].spotNumber} and ${spots[i + 1].spotNumber}`);
      
          if (
            spots[i].vehicle && spots[i].vehicle.equals(vehicle._id) &&
            spots[i + 1].vehicle && spots[i + 1].vehicle.equals(vehicle._id)
          ) {
            console.log('Consecutive spots found:', spots[i].spotNumber, spots[i + 1].spotNumber);
            spots[i].isOccupied = false;
            spots[i].vehicle = null;
            spots[i + 1].isOccupied = false;
            spots[i + 1].vehicle = null;
      
            await spots[i].save();
            await spots[i + 1].save();
            await Vehicle.deleteOne({ _id: vehicle._id });
      
            return res.status(200).json({
              message: 'Truck left successfully',
              floorNumber: floor.floorNumber,
              spots: [spots[i].spotNumber, spots[i + 1].spotNumber]
            });
          }
        }
        return res.status(404).json({ message: 'Vehicle not parked' });
      } else {
        const spot = await Spot.findOne({vehicle: vehicle._id, isOccupied: true});
        const floor = await Floor.findOne({ spots: spot._id });
        if (spot) {
          spot.isOccupied = false;
          spot.vehicle = null;
          await spot.save();

          await Vehicle.deleteOne({ _id: vehicle._id });

          return res.status(200).json({
            message: 'Vehicle left successfully',
            floorNumber: floor.floorNumber,
            spotNumber: spot.spotNumber
          });
        }
      }
      res.status(404).json({ message: 'Vehicle not found in any spot' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error in leaving vehicle' });
    }
  }
}

module.exports = { VehicleController };
