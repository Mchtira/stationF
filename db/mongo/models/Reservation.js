const mongoose = require('mongoose')

const Reservation = new mongoose.Schema({
  startHour: String,
  endHour: String,
  day: String,
  name: String,
})

module.exports = mongoose.model('reservation', Reservation)