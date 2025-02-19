const { Floor } = require('../models/floor.model');
const { Spot } = require('../models/spot.model');

class SpotController {
  static async getAvailableSpots(req, res) {
    try {
      const { type } = req.query;
      const floors = await Floor.find().populate('spots');
      const availableSpots = [];

      floors.forEach(floor => {
        const freeSpots = floor.spots.filter(spot => !spot.isOccupied);
        
        if (type === 'truck') {
          for (let i = 0; i < freeSpots.length - 1; i++) {
            if (freeSpots[i + 1].spotNumber === freeSpots[i].spotNumber + 1) {
              availableSpots.push({
                floorNumber: floor.floorNumber,
                spots: [freeSpots[i].spotNumber, freeSpots[i + 1].spotNumber]
              });
              i++;
            }
          }
        } else {
          freeSpots.forEach(spot => {
            availableSpots.push({
              floorNumber: floor.floorNumber,
              spotNumber: spot.spotNumber
            });
          });
        }
      });

      if (availableSpots.length === 0) {
        return res.status(200).json({ message: 'No available spots' });
      }

      res.status(200).json({
        message: 'Available spots found',
        availableSpots
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error in finding available spots' });
    }
  }
}

module.exports = {SpotController};
