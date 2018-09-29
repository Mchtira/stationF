const mongoose = require('mongoose')

const RoomReservation = new mongoose.Schema({
  startHour: Number,
  startmiutes: Number,
  endHour: Number,
  endminutes: Number,
  day: String,
})

module.exports = mongoose.model('room', RoomReservation)