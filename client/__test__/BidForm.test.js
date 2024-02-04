import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import BidForm from './BidForm';
import React from 'react';


const mockStore = configureStore([]);
// eslint-disable-next-line no-undef
describe('BidForm component', () => {
  let store;
// eslint-disable-next-line no-undef
  beforeEach(() => {
    store = mockStore({
      user: {
        _id: 'user123',
        firstName: 'John',
      },
      token: 'token123',
    });
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <Router>
          <BidForm />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText('Your New Bid')).toBeInTheDocument();
    expect(screen.getByText('Item Price:')).toBeInTheDocument();
    expect(screen.getByText('Current Bid:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Place Bid' })).toBeInTheDocument();
  });

  it('should show an error message when submitting an invalid bid', async () => {
    const { getByLabelText, getByRole, queryByText } = render(
      <Provider store={store}>
        <Router>
          <BidForm />
        </Router>
      </Provider>
    );

    const bidInput = getByLabelText('Your New Bid');
    const submitButton = getByRole('button', { name: 'Place Bid' });

    fireEvent.change(bidInput, { target: { value: '3' } });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(queryByText('Bid amount must be 5 or greater')).toBeInTheDocument();
    });
  });

  it('should submit the bid and redirect to the home page', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <Router>
          <BidForm />
        </Router>
      </Provider>
    );

    const bidInput = getByLabelText('Your New Bid');
    const submitButton = getByRole('button', { name: 'Place Bid' });

    fireEvent.change(bidInput, { target: { value: '10' } });
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/posts/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newBid: '10', currentBidUserName: 'John' }),
      });
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/users/user123/addNotification', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer token123',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_who_left_review: 'user123',
          user_who_left_review_name: 'John',
          user_who_gets_review: undefined,
          review: 'John has placed a bid of 10 on undefined',
        }),
      });
      expect(global.window.location.pathname).toEqual('/home');
    });
  });
});