const mongoose = require('mongoose')
const mongoUrl = process.env.mongoDb || 'mongodb://anyway:lollillol2@ds115553.mlab.com:15553/stationfreservation'
const RoomReservation = require('./models/RoomReservation.js')
const Rooms = require('./models/Rooms.js')
const d = new Date()
const date = d.toJSON().slice(0, 10)

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    console.log('Database connection successful')
  } catch (err) {
    console.error(`Database connection error - ${err}`)
  }
}

connect()

const getAllRooms = () => Rooms.find()

const reservation = async (date) => {

}

module.exports = {
  reservation,
  getAllRooms,
}