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

module.exports = {
  filterByEquipements,
  filterByCapacity,
}
