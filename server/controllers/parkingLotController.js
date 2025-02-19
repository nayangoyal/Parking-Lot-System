const { ParkingLotController: CreateParkingLotController } = require('./createParkingLotController');
const {ParkingLotController: isParkingLotFullController} = require('./isParkingLotFullController');

class ParkingLotController {
  static async isParkingLotFull(req, res) {
    await isParkingLotFullController.isParkingLotFull(req, res);
  }

  static async createParkingLot(req, res) {
    await CreateParkingLotController.createParkingLot(req, res);
  }
}

module.exports = { ParkingLotController };
