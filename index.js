const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 4000

const rooms = require(path.join(__dirname, '/db/fs/rooms.json'))

const app = express()

app.use(cors())

app.get('/', (req, res) => res.json('Hello World !'))

app.get('/rooms', (req, res) => res.json(rooms))

app.listen(port, () => console.log(`Listen on port ${port}`))
