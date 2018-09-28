const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require('util')
const path = require('path')
const fs = require('fs')
const fn = require('./function.js')
const port = process.env.PORT || 4000

const readFile = util.promisify(fs.readFile)
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.json('Hello World !'))

app.get('/rooms', async (req, res) => {
  const data = await readFile(path.join(__dirname, '/db/fs/rooms.json'), 'utf8')
  let rooms = JSON.parse(data).rooms
  res.json(rooms)
})

app.post('/rooms', async (req, res) => {
  const equipements = req.body.equipements
  const capacity = req.body.capacity
  const data = await readFile(path.join(__dirname, '/db/fs/rooms.json'), 'utf8')
  let rooms = JSON.parse(data).rooms
  if (equipements) rooms = fn.filterByEquipements(rooms, equipements)
  if (capacity) rooms = fn.filterByCapacity(rooms, capacity)
  res.json(rooms)
})

app.listen(port, () => console.log(`Listen on port ${port}`))
