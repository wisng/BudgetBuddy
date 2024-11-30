import { render, screen, fireEvent } from '@testing-library/react';
import AddSharedBudgetModal from '../../components/AddSharedBudget';

// Mock axios with default export
jest.mock('../../utils/customAxiosInstance', () => ({
  default: {
    post: jest.fn(() => Promise.resolve({ data: { message: 'Success' } }))
  }
}));

describe('AddSharedBudgetModal Component', () => {
  const mockProps = {
    showModal: true,
    setShowModal: jest.fn(),
    setRefresh: jest.fn(),
    fetchAllBudgets: jest.fn()
  };

  test('renders basic form elements', () => {
    render(<AddSharedBudgetModal {...mockProps} />);

    // Check basic form elements
    expect(screen.getByText('Add Budget')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Initial Balance')).toBeInTheDocument();
  });

  test('handles form inputs', () => {
    render(<AddSharedBudgetModal {...mockProps} />);

    // Test title input
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Vacation Budget' } });
    expect(titleInput.value).toBe('Vacation Budget');

    // Test balance input
    const balanceInput = screen.getByLabelText('Initial Balance');
    fireEvent.change(balanceInput, { target: { value: '1000' } });
    expect(balanceInput.value).toBe('1000');
  });
});
