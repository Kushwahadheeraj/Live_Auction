import { render, screen } from '@testing-library/react';
import BidPage from '../src/Pages/BidPage';

describe('BidPage', () => {
  test('renders BidForm component', () => {
    render(<BidPage />);
    const bidForm = screen.getByTestId('bid-form');
    expect(bidForm).toBeInTheDocument();
  });
  
  test('renders Navbar component', () => {
    render(<BidPage />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
  });
  
  test('renders Footer component', () => {
    render(<BidPage />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});