// Import necessary modules
import { render, screen } from '@testing-library/react';
import LoginPage from '../src/Pages/LoginPage'
import React from 'react';

// Write your tests here
// eslint-disable-next-line no-undef
test('LoginPage renders correctly', () => {
  // Render the LoginPage component
  render(<LoginPage />);
  
  // Test for the presence of the logo image
  const logoImg = screen.getByAltText('img');
  // eslint-disable-next-line no-undef
  expect(logoImg).toBeInTheDocument();
  
  // Test for the presence of the page title
  const pageTitle = screen.getByText('Welcome to Antique Auctions');
  // eslint-disable-next-line no-undef
  expect(pageTitle).toBeInTheDocument();
  
  // Test for the presence of the registration form
  const registerForm = screen.getByRole('form');
  // eslint-disable-next-line no-undef
  expect(registerForm).toBeInTheDocument();
});