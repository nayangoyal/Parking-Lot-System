const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const vehicleSchema = new Schema({
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['Bike', 'Car', 'Truck'],
    required: true
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = {Vehicle};