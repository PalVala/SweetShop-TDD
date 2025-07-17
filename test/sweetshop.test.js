const { Sweet, sweets } = require('../model/sweet');
const { addSweet,deleteSweet } = require('../controller/sweetshop');

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
