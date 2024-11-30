import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Wrapper from '../screens/Wrapper';

// Mock the Navbar component
jest.mock('../components/Navbar', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar Mock</div>
}));

// Mock axios with a default export
jest.mock('../utils/customAxiosInstance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: { budget: { id: 1 } } }))
  }
}));

describe('Wrapper Component', () => {
  // Simple test component
  const TestComponent = () => <div data-testid="test-content">Test Content</div>;

  test('renders loading state and wrapped content', async () => {
    render(
      <BrowserRouter>
        <Wrapper Component={TestComponent} />
      </BrowserRouter>
    );

    // Check loading state
    expect(screen.getByText('Loading budget...')).toBeInTheDocument();

    // Check final render
    expect(await screen.findByTestId('navbar')).toBeInTheDocument();
    expect(await screen.findByTestId('test-content')).toBeInTheDocument();
  });
});
