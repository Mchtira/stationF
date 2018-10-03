const mongoose = require('mongoose')

const RoomsModel = new mongoose.Schema({
  name: String,
  description: String,
  capacity: Number,
  equipements: Array,
  createdAt: String,
  updatedAt: String
})

module.exports = mongoose.model('Room', RoomsModel)
