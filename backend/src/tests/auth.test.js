const db = require('../config/db');
const authService = require('../services/authService');

// Simple mock for database
jest.mock('../config/db', () => ({
  query: jest.fn()
}));

test('can register new user', async () => {
  const newUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  };

  db.query.mockImplementation((query, values, callback) => {
    callback(null, { insertId: 1 });
  });

  const result = await authService.register(newUser);
  expect(result.userID).toBe(1);
});

test('can login user', async () => {
  const loginInfo = {
    email: 'test@example.com',
    password: 'password123'
  };

  const mockUser = {
    userID: 1,
    email: 'test@example.com',
    password: 'hashedPassword'
  };

  db.query.mockImplementation((query, values, callback) => {
    callback(null, [mockUser]);
  });

  const result = await authService.login(loginInfo);
  expect(result.userID).toBe(1);
});

test('handles invalid login', async () => {
  db.query.mockImplementation((query, values, callback) => {
    callback(null, []);
  });

  try {
    await authService.login({
      email: 'wrong@example.com',
      password: 'wrongpassword'
    });
  } catch (error) {
    expect(error.message).toBe('Invalid credentials');
  }
});
