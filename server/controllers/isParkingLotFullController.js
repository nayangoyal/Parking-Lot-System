const { Floor } = require('../models/floor.model');

class ParkingLotController {
  static async isParkingLotFull(req, res) {
    try {
      const { floorNumber } = req.params;
      const { spotNumber } = req.query;

      const floor = await Floor.findOne({ floorNumber }).populate('spots');
      if (!floor) {
        return res.status(404).json({ message: 'Floor not found' });
      }

      let isFull = floor.spots.every(spot => spot.isOccupied);

      for (let i = 0; i < floor.spots.length - 1; i++) {
        if (!floor.spots[i].isOccupied && !floor.spots[i + 1].isOccupied) {
          isFull = false;
          break;
        }
      }

      if (spotNumber) {
        const spot = floor.spots.find(s => s.spotNumber === parseInt(spotNumber));
        if (!spot) {
          return res.status(404).json({ message: `Spot ${spotNumber} not found on Floor ${floorNumber}` });
        }
        return res.status(200).json({ floorNumber, spotNumber, isOccupied: spot.isOccupied });
      }

      res.status(200).json({ floorNumber, isFull });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error checking floor/spot occupancy' });
    }
  }
}

module.exports = {ParkingLotController};