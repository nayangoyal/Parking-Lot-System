// const {Vehicle} = require('../models/vehicle.model');
// const {Floor} = require('../models/floor.model');
// const {Spot} = require('../models/spot.model');

// const getVehicleLocation = async (req, res) => {
//   try {
//     const {licensePlate, type} = req.body;

//     const vehicle = await Vehicle.findOne({ licensePlate, type });
//     if (!vehicle) {
//       return res.status(404).json({ message: 'Vehicle not found' });
//     }

//     const spot = await Spot.findOne({ vehicle: vehicle._id, isOccupied: true });
//     if (!spot) {
//       return res.status(404).json({ message: 'Vehicle is not parked in any spot' });
//     }

//     const floor = await Floor.findOne({ spots: spot._id });
//     if (!floor) {
//       return res.status(500).json({ message: 'Floor not found for this spot' });
//     }

//     if (type === 'truck') {
//       if (spots.length !== 2) {
//         return res.status(500).json({ message: 'Truck should occupy two consecutive spots, but inconsistency found' });
//       }

//       const [spot1, spot2] = spots;
//       if (Math.abs(spot1.spotNumber - spot2.spotNumber) !== 1) {
//         return res.status(500).json({ message: 'Truck spots are not consecutive' });
//       }

//       res.status(200).json({
//         message: 'Vehicle location found',
//         floorNumber: floor.floorNumber,
//         spots: [spot1.spotNumber, spot2.spotNumber]
//       });
//     } else {
//       res.status(200).json({
//         message: 'Vehicle location found',
//         floorNumber: floor.floorNumber,
//         spotNumber: spots[0].spotNumber
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error in finding vehicle location' });
//   }
// };

// module.exports = {getVehicleLocation};


const { Vehicle } = require('../models/vehicle.model');
const { Floor } = require('../models/floor.model');
const { Spot } = require('../models/spot.model');

class VehicleController {
  static async getVehicleLocation(req, res) {
    try {
      const { licensePlate, type } = req.body;
      
      const vehicle = await Vehicle.findOne({ licensePlate, type });
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      const spots = await Spot.find({ vehicle: vehicle._id, isOccupied: true });
      if (spots.length === 0) {
        return res.status(404).json({ message: 'Vehicle is not parked in any spot' });
      }

      const floor = await Floor.findOne({ spots: { $in: spots.map(spot => spot._id) } });
      if (!floor) {
        return res.status(500).json({ message: 'Floor not found for this spot' });
      }

      if (type === 'Truck') {
        if (spots.length !== 2) {
          return res.status(500).json({ message: 'Truck should occupy two consecutive spots, but inconsistency found' });
        }

        const [spot1, spot2] = spots;
        if (Math.abs(spot1.spotNumber - spot2.spotNumber) !== 1) {
          return res.status(500).json({ message: 'Truck spots are not consecutive' });
        }

        return res.status(200).json({
          message: 'Vehicle location found',
          floorNumber: floor.floorNumber,
          spots: [spot1.spotNumber, spot2.spotNumber]
        });
      } else {
        return res.status(200).json({
          message: 'Vehicle location found',
          floorNumber: floor.floorNumber,
          spotNumber: spots[0].spotNumber
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error in finding vehicle location' });
    }
  }
}

module.exports = {VehicleController};
