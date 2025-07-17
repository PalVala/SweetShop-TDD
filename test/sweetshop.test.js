const { Sweet, sweets } = require('../model/sweet');
const { addSweet,deleteSweet,getAllSweets } = require('../controller/sweetshop');

beforeEach(() => sweets.length = 0); 


// adding a new sweet
test('addSweet() should add a new sweet using Sweet class', () => {
  const sweetData = {
    id: 1,
    name: 'Kaju Katli',
    category: 'Nut-Based',
    price: 50,
    quantity: 20
  };

  const result = addSweet(sweetData);

  expect(sweets.length).toBe(1);
  expect(sweets[0]).toMatchObject(sweetData);
  expect(result).toBeInstanceOf(Sweet);
});


// Delete existing sweet
test('deleteSweet() should remove sweet by ID', () => {
  const sweetData = { id: 1, name: 'Ladoo', category: 'Traditional', price: 25, quantity: 30 };
  addSweet(sweetData);

  const result = deleteSweet(1);

  expect(result).toBe(true);
  expect(sweets.length).toBe(0);
});

// Delete non-existent sweet
test('deleteSweet() should throw error if ID not found', () => {
  expect(() => deleteSweet(99)).toThrow('Sweet with ID 99 not found');
});


// get all exist sweets

test('getAllSweets() should return all sweets', () => {
  const sweet1 = { id: 1, name: 'Jalebi', category: 'Fried', price: 20, quantity: 50 };
  const sweet2 = { id: 2, name: 'Rasgulla', category: 'Syrup-Based', price: 35, quantity: 40 };

  addSweet(sweet1);
  addSweet(sweet2);

  const result = getAllSweets();

  expect(result.length).toBe(2);
  expect(result).toEqual(expect.arrayContaining([expect.objectContaining(sweet1), expect.objectContaining(sweet2)]));
});
