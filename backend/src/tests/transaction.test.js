const db = require('../config/db');
const transactionService = require('../services/transactionService');
const { test, expect } = require('@jest/globals');

// Mock the database
jest.mock('../config/db', () => ({
  query: jest.fn()
}));

test('creates a transaction', async () => {
  // Mock data
  const transaction = {
    title: 'Groceries',
    amount: 50.00,
    categoryID: 1,
    budgetID: 1
  };

  // Mock successful database response
  db.query.mockImplementation((query, values, callback) => {
    callback(null, { insertId: 1 });
  });

  const result = await transactionService.createTransaction(transaction);
  expect(result.transactionID).toBe(1);
});

test('gets a transaction', async () => {
  const mockTransaction = {
    transactionID: 1,
    title: 'Groceries',
    amount: 50.00
  };

  db.query.mockImplementation((query, values, callback) => {
    callback(null, [mockTransaction]);
  });

  const result = await transactionService.getTransaction(1);
  expect(result).toEqual(mockTransaction);
});
