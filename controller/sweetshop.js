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

function updateSweet(id, newData) {
  const sweet = sweets.find(s => s.id === id);

  if (!sweet) {
    throw new Error(`Sweet with ID ${id} not found`);
  }

  // Update only if property exists in newData
  if (newData.name !== undefined) sweet.name = newData.name;
  if (newData.category !== undefined) sweet.category = newData.category;
  if (newData.price !== undefined) sweet.price = newData.price;
  if (newData.quantity !== undefined) sweet.quantity = newData.quantity;

  return sweet;
}


function searchSweets({ name, category, minPrice, maxPrice }) {
  return sweets.filter(sweet => {
    const matchName = name ? sweet.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchCategory = category ? sweet.category.toLowerCase() === category.toLowerCase() : true;
    const matchMinPrice = minPrice !== undefined ? sweet.price >= minPrice : true;
    const matchMaxPrice = maxPrice !== undefined ? sweet.price <= maxPrice : true;

    return matchName && matchCategory && matchMinPrice && matchMaxPrice;
  });
}

module.exports = {
  addSweet,
  deleteSweet,
  getAllSweets,
  updateSweet,
  searchSweets
};











