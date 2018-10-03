const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fn = require('./function.js')
const db = require('./db/mongo/mongo.js')
const port = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.json('Hello World !'))

app.post('/rooms', async (req, res) => {
  let { equipements, capacity, startHour, endHour, day } = req.body

  if (startHour, endHour, day && [startHour, endHour, day].includes('')) {
    res.json('Merci de remplir tout les champs')
  } else if (fn.timeToMinutes(startHour) > fn.timeToMinutes(endHour)) {
    res.json('La date est invalide')
  } else {
    let rooms = await db.getFreeRoom({ startHour, endHour, day })
    if (equipements) rooms = fn.filterByEquipements(rooms, equipements)
    if (capacity) rooms = fn.filterByCapacity(rooms, capacity)
    res.json(rooms[0] ? rooms : 'Aucune salle disponible')
  }
})

app.post('/reserveRoom', async (req, res) => {
  let { startHour, endHour, day, name } = req.body

  if (startHour, endHour, day, name && [startHour, endHour, day, name].includes('')) {
    res.json('Merci de remplir tout les champs')
  } else if (fn.timeToMinutes(startHour) > fn.timeToMinutes(endHour)) {
    res.json('La date est invalide')
  } else {
    const isFree = await db.isRoomFree(req.body)
    if (isFree) {
      db.newReservation(req.body)
      res.json(`La salle ${name} à été reservé le ${fn.prettyDate(day)} de ${startHour} à ${endHour}`)
    } else {
      res.json('Oops, la salle est déjà réservé')
    }
  }
})

app.listen(port, () => console.log(`Listen on port ${port}`))
