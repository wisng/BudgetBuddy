# BudgetBuddy

## Testing Documentation

### Frontend Tests

The frontend uses React Testing Library for component testing. Key test files:

- `Home.test.jsx`: Tests for the main dashboard page
  - Verifies welcome message
  - Checks budget overview section
  - Validates recent transactions display

- `Transactions.test.jsx`: Tests for the transactions page
  - Tests transaction list rendering
  - Verifies add transaction functionality
  - Tests modal interactions

### Backend Tests

The backend uses Jest for testing core business logic:

- `transaction.test.js`: Tests for transaction service
  - Tests transaction creation
  - Validates transaction retrieval
  - Ensures proper database interactions

### Running Tests

Frontend tests:
```bash
cd frontend
npm test
```

Backend tests:
```bash
cd backend
npm test
```

### Writing Tests

When adding new features:
1. Focus on testing core functionality
2. Test user interactions for frontend components
3. Test business logic for backend services
4. Keep tests simple and maintainable
