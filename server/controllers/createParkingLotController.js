const {ParkingLot} = require('../models/parkingLot.model');
const {Floor} = require('../models/floor.model');
const {Spot} = require('../models/spot.model');
const {Vehicle} = require('../models/vehicle.model');
const { validationResult } = require('express-validator');

class ParkingLotController {
    static async createParkingLot(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        // const numFloors = 2;
        // const spotsPerFloor = 2;
        await Spot.deleteMany({});
        await Floor.deleteMany({});
        await ParkingLot.deleteMany({});
        await Vehicle.deleteMany({});

        const { numFloors, spotsPerFloor } = req.body;
        const parkingLot = new ParkingLot({ numFloors, spotsPerFloor });
  
        for (let i = 1; i <= numFloors; i++) {
          const floor = new Floor({ floorNumber: i });
          for (let j = 1; j <= spotsPerFloor; j++) {
            const spot = new Spot({ spotNumber: j });
            await spot.save();
            floor.spots.push(spot._id);
          }
          await floor.save();
          parkingLot.floors.push(floor._id);
        }
  
        await parkingLot.save();
        res.status(201).json({ message: 'Parking Lot created successfully', parkingLot });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating parking lot' });
      }
    }
  }
  
module.exports = { ParkingLotController };