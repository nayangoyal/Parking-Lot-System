const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const spotSchema = new Schema({
  spotNumber: {
    type: Number,
    required: true
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }
});

const Spot = mongoose.model('Spot', spotSchema);
module.exports = {Spot};
