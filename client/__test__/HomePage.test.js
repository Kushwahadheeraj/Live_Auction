import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../src/App';
import store from '../src/Redux/store';
// eslint-disable-next-line no-undef
describe('App', () => {
  // eslint-disable-next-line no-undef
  test('renders LoginPage by default', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const loginPageElement = screen.getByText(/login/i);
    // eslint-disable-next-line no-undef
    expect(loginPageElement).toBeInTheDocument();
  });
// eslint-disable-next-line no-undef
  test('renders Home page when user is authenticated', () => {
    const token = 'jsonwebtoken';
    store.dispatch({ type: 'jsonwebtoken', payload: token });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const homePageElement = screen.getByText(/home/i);
    // eslint-disable-next-line no-undef
    expect(homePageElement).toBeInTheDocument();
  });
// eslint-disable-next-line no-undef
  test('renders ErrorPage for unknown routes', () => {
    // eslint-disable-next-line no-undef
    const { history } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    );
    history.push('/invalid-route');
    const errorPageElement = screen.getByText(/404/i);
    // eslint-disable-next-line no-undef
    expect(errorPageElement).toBeInTheDocument();
  });
});