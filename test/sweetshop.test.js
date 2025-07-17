const { Sweet, sweets } = require('../model/sweet');
const { addSweet,deleteSweet,getAllSweets,updateSweet,searchSweets ,purchaseSweet,restockSweet} = require('../controller/sweetshop');

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


// update sweet

test('updateSweet() should update sweet properties correctly', () => {
  const sweetData = { id: 1, name: 'Barfi', category: 'Milk-Based', price: 40, quantity: 30 };
  addSweet(sweetData);

  const updatedData = { name: 'Kesar Barfi', price: 45 };
  const updatedSweet = updateSweet(1, updatedData);

  expect(updatedSweet.name).toBe('Kesar Barfi');
  expect(updatedSweet.price).toBe(45);
  expect(updatedSweet.category).toBe('Milk-Based'); // Unchanged
  expect(updatedSweet.quantity).toBe(30);           // Unchanged
});

test('updateSweet() should throw error for non-existent sweet', () => {
  expect(() => updateSweet(99, { name: 'Invalid' })).toThrow('Sweet with ID 99 not found');
});

// searching sweet by name, catagory or price range


test('searchSweets() should return sweets matching name', () => {
  addSweet({ id: 1, name: 'Ladoo', category: 'Round', price: 30, quantity: 10 });
  addSweet({ id: 2, name: 'Motichoor Ladoo', category: 'Round', price: 35, quantity: 15 });

  const result = searchSweets({ name: 'ladoo' });
  expect(result.length).toBe(2);
});

test('searchSweets() should return sweets matching category', () => {
  addSweet({ id: 3, name: 'Rasgulla', category: 'Syrupy', price: 25, quantity: 10 });
  const result = searchSweets({ category: 'syrupy' });
  expect(result.length).toBe(1);
  expect(result[0].name).toBe('Rasgulla');
});

test('searchSweets() should return sweets in price range', () => {
  const result = searchSweets({ minPrice: 30, maxPrice: 35 });
  expect(result.every(s => s.price >= 30 && s.price <= 35)).toBe(true);
});



// purchasing sweet & reduce the stock
test('purchaseSweet() should reduce quantity of sweet', () => {
  addSweet({ id: 10, name: 'Barfi', category: 'Milk-Based', price: 40, quantity: 10 });
  const updated = purchaseSweet(10, 3);

  expect(updated.quantity).toBe(7);
});

test('purchaseSweet() should throw error if sweet not found', () => {
  expect(() => purchaseSweet(99, 1)).toThrow('Sweet with ID 99 not found');
});

test('purchaseSweet() should throw error if insufficient stock', () => {
  addSweet({ id: 11, name: 'Halwa', category: 'Hot', price: 25, quantity: 2 });

  expect(() => purchaseSweet(11, 5)).toThrow('Only 2 Halwa available in stock');
});




test('restockSweet() should increase quantity of a sweet', () => {
  addSweet({ id: 20, name: 'Modak', category: 'Traditional', price: 35, quantity: 5 });
  const updated = restockSweet(20, 10);

  expect(updated.quantity).toBe(15);
});

test('restockSweet() should throw error if sweet not found', () => {
  expect(() => restockSweet(999, 5)).toThrow('Sweet with ID 999 not found');
});

test('restockSweet() should throw error for invalid quantity', () => {
  addSweet({ id: 21, name: 'Gulab Jamun', category: 'Syrup-Based', price: 30, quantity: 5 });

  expect(() => restockSweet(21, 0)).toThrow('Restock quantity must be greater than 0');
});
