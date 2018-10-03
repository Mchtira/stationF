const mongoose = require('mongoose')
const mongoUrl = process.env.mongoDb
const Reservation = require('./models/Reservation.js')
const Rooms = require('./models/Rooms.js')
const d = new Date()
const date = d.toJSON().slice(0, 10)
const fn = require('../../function.js')

const connect = async () => {
  try {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true })
    console.log('Database connection successful')
  } catch (err) {
    console.error(`Database connection error - ${err}`)
  }
}

connect()

const newReservation = (reservation) => new Reservation({ ...reservation }).save()

const isRoomFree = async ({ startHour, endHour, day, name }) => {
  const reservations = await Reservation.find({ day, name })
  startHour = fn.timeToMinutes(startHour)
  endHour = fn.timeToMinutes(endHour)
  if (reservations.length > 0) return false
  const unavailableRooms = reservations.filter(reservation => {
    let resaStartHour = reservation.startHour.split(':').map(elem => Number(elem))
    let resaEndHour = reservation.endHour.split(':').map(elem => Number(elem))
    resaStartHour = resaStartHour[0] * 60 + resaStartHour[1]
    resaEndHour = resaEndHour[0] * 60 + resaEndHour[1]
    if (startHour >= resaStartHour && startHour < resaEndHour) { return true }
    if (endHour = resaStartHour && endHour <= resaEndHour) { return true }
    if (startHour < resaStartHour && endHour > resaStartHour) { return true }
    return false
  })
  if (unavailableRooms.length > 0) return false
  return true
}

const getFreeRoom = async ({ day, startHour, endHour }) => {
  const reservations = await Reservation.find({ day })
  startHour = fn.timeToMinutes(startHour)
  endHour = fn.timeToMinutes(endHour)
  const allRooms = await Rooms.find()

  const unavailableRooms = reservations.filter(reservation => {
    let resaStartHour = reservation.startHour.split(':').map(elem => Number(elem))
    let resaEndHour = reservation.endHour.split(':').map(elem => Number(elem))
    resaStartHour = resaStartHour[0] * 60 + resaStartHour[1]
    resaEndHour = resaEndHour[0] * 60 + resaEndHour[1]
    if (startHour >= resaStartHour && startHour < resaEndHour) { return true }
    if (endHour > resaStartHour && endHour <= resaEndHour) { return true }
    if (startHour < resaStartHour && endHour > resaStartHour) { return true }
    return false
  })

  const availableRooms = allRooms.filter(room => {
    for (let i = 0; unavailableRooms[i]; i++) {
      if (unavailableRooms[i].name === room.name) return false
    }
    return true
  })

  return availableRooms
}

module.exports = {
  newReservation,
  getFreeRoom,
  isRoomFree
}
