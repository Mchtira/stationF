const mongoose = require('mongoose')
const mongoUrl = process.env.mongoDb || 'mongodb://anyway:lollillol2@ds115553.mlab.com:15553/stationfreservation'
const Reservation = require('./models/Reservation.js')
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

const newReservation = async (reservation) => new Reservation({ ...reservation }).save()

const getAllReservation = () => Reservation.find()

const getReservationAtDay = (day) => Reservation.find(day) 

//baaaah caca, c'est craaade
const getFreeRoom = async ({day, startHour, endHour}) => {
  const wantedStartHour = Number(startHour.split(':')[0])
  const wantedEndHour = Number(endHour.split(':')[0])
  const reservations = await getReservationAtDay({ day })
  const allRooms = await getAllRooms()
  const unavailableRooms = reservations.filter(reservation => {
    const reservationStartHour = Number(reservation.startHour.split(':')[0])
    const reservationEndHour = Number(reservation.endHour.split(':')[0])
    if (wantedStartHour >= reservationStartHour && wantedStartHour < reservationEndHour)
      return true
    if (wantedEndHour >= reservationStartHour && wantedEndHour < reservationEndHour)
      return true
    return false
  })

  const availableRooms = allRooms.filter(room => {
    for(let i = 0; unavailableRooms[i]; i++) {
      if (unavailableRooms[i].name === room.name)
        return false
    }
    return true
  })

  return availableRooms
}

module.exports = {
  newReservation,
  getAllRooms,
  getAllReservation,
  getReservationAtDay,
  getFreeRoom
}