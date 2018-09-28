const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require('util')
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 4000
const readFile = util.promisify(fs.readFile)

const app = express()

const filterByEquipement = (rooms, filterEquipements) => {
  return rooms.filter(room => {
    const goodRooms = []
    room.equipements.forEach(roomEquipement => {
      filterEquipements.forEach(equipement => {
        if (equipement === roomEquipement.name) goodRooms.push(equipement)
      })
    })
    if (goodRooms.length === filterEquipements.length) return true
    return false
  })
}

const filterByCapacity = (rooms, capacity) => {
  return rooms.filter(room => room.capacity >= capacity)
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.json('Hello World !'))

app.get('/rooms', async (req, res) => {
  let rooms = await readFile(path.join(__dirname, '/db/fs/rooms.json'), 'utf8')
  rooms = JSON.parse(rooms)
  res.json(rooms)
})

app.post('/rooms', async (req, res) => {
  const equipements = req.body.equipements
  const capacity = req.body.capacity
  let rooms = await readFile(path.join(__dirname, '/db/fs/rooms.json'), 'utf8')
  rooms = JSON.parse(rooms)
  rooms = rooms.rooms
  if (equipements) rooms = filterByEquipement(rooms, equipements)
  if (capacity) rooms = filterByCapacity(rooms, capacity)
  console.log(rooms)
  res.json(rooms)
})

app.listen(port, () => console.log(`Listen on port ${port}`))
