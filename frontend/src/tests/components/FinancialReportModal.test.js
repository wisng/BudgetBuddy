import { render, screen, fireEvent } from '@testing-library/react';
import FinancialReportModal from '../../components/FinancialReportModal';

// Mock DatePicker
jest.mock('@mui/x-date-pickers', () => ({
  DatePicker: () => <input data-testid="date-picker" />,
  LocalizationProvider: ({ children }) => children
}));

// Mock axios with default export
jest.mock('../../utils/customAxiosInstance', () => ({
  default: {
    post: jest.fn(() => Promise.resolve({
      data: {
        message: 'Report generated',
        report: {
          month: 'January',
          year: 2024,
          totalIncome: 5000,
          totalExpenses: 3000,
          savingsRate: 40
        }
      }
    }))
  }
}));

describe('FinancialReportModal Component', () => {
  const mockProps = {
    budgetID: 1,
    showModal: true,
    setShowModal: jest.fn(),
    setRefresh: jest.fn()
  };

  test('renders basic form elements', () => {
    render(<FinancialReportModal {...mockProps} />);

    // Check basic form elements
    expect(screen.getByText('Generate Financial Report')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate financial report/i })).toBeInTheDocument();
  });

  test('handles report generation', async () => {
    render(<FinancialReportModal {...mockProps} />);

    // Click generate button
    fireEvent.click(screen.getByRole('button', { name: /generate financial report/i }));

    // Check if report data is displayed
    expect(await screen.findByText(/Total Income/)).toBeInTheDocument();
    expect(await screen.findByText(/Total Expenses/)).toBeInTheDocument();
    expect(await screen.findByText(/Savings Rate/)).toBeInTheDocument();
  });
});
