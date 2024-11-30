import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../screens/Home';

// Basic mock data
const mockBudget = {
  budgetID: 1,
  title: 'Test Budget',
  totalBalance: 1000,
  totalIncome: 2000,
  totalExpenses: 1000
};

const mockProps = {
  budget: mockBudget,
  goals: [],
  categories: [],
  users: [{ current: true }],
  financialReports: [],
  setRefresh: () => {}
};

describe('Home Component', () => {
  test('displays budget information', () => {
    render(
      <BrowserRouter>
        <Home {...mockProps} />
      </BrowserRouter>
    );

    // Basic checks for main budget info
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('$2000')).toBeInTheDocument(); // Income
    expect(screen.getByText('$1000')).toBeInTheDocument(); // Balance/Expenses
  });
});
