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

app.get('/rooms', async (req, res) => {
  console.log(req.body)
  const rooms = await db.getAllRooms()
  res.json(rooms)
})

app.post('/rooms', async (req, res) => {
  console.log(req.body)
  const equipements = req.body.equipements
  const capacity = req.body.capacity
  let rooms = await db.getAllRooms()
  if (equipements) rooms = fn.filterByEquipements(rooms, equipements)
  if (capacity) rooms = fn.filterByCapacity(rooms, capacity)
  res.json(rooms)
})

app.post('/availableRooms', async (req, res) => {
  console.log(req.body)
  const { startHour, endHour, day } = req.body
  if ([startHour, endHour, day].includes('')) {
    res.json('Merci de remplir tout les champs')
  } else {
    const rooms = await db.getFreeRoom(req.body)
    res.json(rooms)
  }
})

app.post('/reserveRoom', (req, res) => {
  console.log(req.body)
  const { startHour, endHour, day, name } = req.body
  if ([startHour, endHour, day, name].includes(''))
    res.json('Merci de remplir tout les champs')
  else {
    db.newReservation(req.body)
    res.json(`La salle ${name} à été reservé le ${day} de ${startHour} à ${endHour}`)
  }
})

app.listen(port, () => console.log(`Listen on port ${port}`))
