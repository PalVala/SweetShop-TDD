

const { Sweet } = require('../model/sweet');

describe('Sweet class', () => {
  test('should create a sweet object with correct properties', () => {
    const sweet = new Sweet(1, 'Kaju Katli', 'Nut-Based', 50, 20);

    expect(sweet.id).toBe(1);
    expect(sweet.name).toBe('Kaju Katli');
    expect(sweet.category).toBe('Nut-Based');
    expect(sweet.price).toBe(50);
    expect(sweet.quantity).toBe(20);
  });
});
