const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const floorSchema = new Schema({
  floorNumber: {
    type: Number,
    required: true
  },
  spots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot'
  }]
});

const Floor = mongoose.model('Floor', floorSchema);
module.exports = {Floor};