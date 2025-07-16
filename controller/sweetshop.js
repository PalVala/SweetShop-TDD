const { Sweet, sweets } = require('../model/sweet');

function addSweet(sweetData) {
  const { id, name, category, price, quantity } = sweetData;
  const sweet = new Sweet(id, name, category, price, quantity);
  sweets.push(sweet);
  return sweet;
}

module.exports = { addSweet };
