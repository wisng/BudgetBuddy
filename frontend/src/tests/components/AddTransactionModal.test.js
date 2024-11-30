import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTransactionModal from '../../components/AddTransactionModal';

// Mock DatePicker
jest.mock('@mui/x-date-pickers', () => ({
  DatePicker: () => <input data-testid="date-picker" />,
  LocalizationProvider: ({ children }) => children
}));

// Mock axios with default export
jest.mock('../../utils/customAxiosInstance', () => ({
  default: {
    post: jest.fn(() => Promise.resolve({ data: { message: 'Success' } }))
  }
}));

describe('AddTransactionModal Component', () => {
  const mockProps = {
    budgetID: 1,
    showModal: true,
    setShowModal: jest.fn(),
    setRefresh: jest.fn(),
    categories: [
      { categoryID: 1, name: 'Food', colour: '#FF0000' },
      { categoryID: 2, name: 'Transport', colour: '#00FF00' }
    ],
    users: [{ userID: 1, username: 'testuser', current: true }]
  };

  test('renders basic form elements', () => {
    render(<AddTransactionModal {...mockProps} />);

    // Check basic form elements
    expect(screen.getByText('Add Transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
  });

  test('handles input fields', () => {
    render(<AddTransactionModal {...mockProps} />);

    // Test title input
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Groceries' } });
    expect(titleInput.value).toBe('Groceries');

    // Test amount input
    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '50' } });
    expect(amountInput.value).toBe('50');
  });

  test('submits form with transaction data', async () => {
    render(<AddTransactionModal {...mockProps} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Transaction' }
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '100' }
    });
    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2023-10-01' }
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Transaction'));

    // Wait for submission and success message
    await waitFor(() => {
      // Verify API call
      expect(mockProps.setRefresh).toHaveBeenCalled();
      expect(screen.getByText('Transaction added successfully')).toBeInTheDocument();
    });
  });
});
