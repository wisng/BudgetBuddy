const db = require('../config/db');
const budgetService = require('../services/budgetService');

// Simple mock for database
jest.mock('../config/db', () => ({
  query: jest.fn()
}));

test('can create budget', async () => {
  const newBudget = {
    title: 'Monthly Budget',
    totalBalance: 1000,
    ownerID: 1
  };

  db.query.mockImplementation((query, values, callback) => {
    callback(null, { insertId: 1 });
  });

  const result = await budgetService.createBudget(newBudget);
  expect(result.budgetID).toBe(1);
});

test('can get budget', async () => {
  const mockBudget = {
    budgetID: 1,
    title: 'Monthly Budget',
    totalBalance: 1000
  };

  db.query.mockImplementation((query, values, callback) => {
    callback(null, [mockBudget]);
  });

  const result = await budgetService.getBudget(1);
  expect(result).toEqual(mockBudget);
});

test('handles budget not found', async () => {
  db.query.mockImplementation((query, values, callback) => {
    callback(null, []);
  });

  const result = await budgetService.getBudget(999);
  expect(result).toBeNull();
});
