const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const parkingLotSchema = new Schema({
  numFloors: {
    type: Number,
    required: true
  },
  spotsPerFloor: {
    type: Number,
    required: true
  },
  floors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor'
  }]
});

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);
module.exports = {ParkingLot};