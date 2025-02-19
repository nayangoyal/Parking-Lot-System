const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { ParkingLotController } = require('../controllers/parkingLotController');
const {VehicleController} = require('../controllers/vehicleController');
const {SpotController} = require('../controllers/getAvailableSpotsController');

// router.route('/create').post(ParkingLotController.createParkingLot);
router.route('/create').post(
    [
      body('numFloors').isInt({ min: 1 }).withMessage('Number of floors must be a positive integer'),
      body('spotsPerFloor').isInt({ min: 1 }).withMessage('Spots per floor must be a positive integer')
    ],
    ParkingLotController.createParkingLot
  );
router.route('/park').post(VehicleController.parkVehicle);
router.route('/leave').post(VehicleController.leaveVehicle);
router.route('/floor/:floorNumber/isFull').get(ParkingLotController.isParkingLotFull);
router.route('/vehicleLocation').post(VehicleController.getVehicleLocation);
router.route('/available-spots').get(SpotController.getAvailableSpots);

module.exports = router;

// http://localhost:5000/api/parking/floor/1/isFull?spotNumber=2