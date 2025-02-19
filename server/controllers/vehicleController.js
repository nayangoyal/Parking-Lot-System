const { VehicleController: ParkVehicleController } = require('./parkingController');
const {VehicleController: LeaveVehicleController} = require('./leaveVehicleController');
const { VehicleController: GetVehicleLocationController } = require('./getVehicleLocationController');

class VehicleController {
  static async parkVehicle(req, res) {
    await ParkVehicleController.parkVehicle(req, res);
  }

  static async leaveVehicle(req, res) {
    await LeaveVehicleController.leaveVehicle(req, res);
  }

  static async getVehicleLocation(req, res) {
    await GetVehicleLocationController.getVehicleLocation(req, res);
  }
}

module.exports = { VehicleController };
