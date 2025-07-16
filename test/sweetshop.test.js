const { Sweet, sweets } = require('../model/sweet');
const { addSweet } = require('../controller/sweetshop');

beforeEach(() => sweets.length = 0); 

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
