const { Sweet, sweets } = require('../model/sweet');

function addSweet(sweetData) {
  const { id, name, category, price, quantity } = sweetData;
  const sweet = new Sweet(id, name, category, price, quantity);
  sweets.push(sweet);
  return sweet;
}

function deleteSweet(id) {
  const index = sweets.findIndex(s => s.id === id);

  if (index !== -1) {
    sweets.splice(index, 1);
    return true; 
  } else {
    throw new Error(`Sweet with ID ${id} not found`);
  }
}

function getAllSweets() {
  return sweets;
}

module.exports = {
  addSweet,
  deleteSweet,
  getAllSweets
};






