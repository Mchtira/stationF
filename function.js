const filterByEquipements = (rooms, filterEquipements) => {
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

const timeToMinutes = (time) => {
  time = time.split(':').map(elem => Number(elem))
  time = time[0] * 60 + time[1]
  return time
}

const prettyDate = (date) => {
  const d = new Date(date)

  const days = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi'
  ]

  const month = [
    'janvier',
    'fevrier',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'aout',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ]

  return `${days[d.getDay()]} ${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`
}

module.exports = {
  filterByEquipements,
  filterByCapacity,
  timeToMinutes,
  prettyDate
}
