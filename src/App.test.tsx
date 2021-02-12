import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import App from './AppWithCookies';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from '@reduxjs/toolkit';

let history: History;
const mockStore = configureStore([]);
let store: Store;

beforeEach(() => {
  history = createBrowserHistory();
});

test('/ redirects to /sign-in if authorized === false', () => {
  history.push('/');
  store = mockStore({ auth: { authorized: false } });
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  );
  expect(queryByTestId('image-gallery')).not.toBeInTheDocument();
  expect(queryByTestId('signin-form')).toBeInTheDocument();
  expect(queryByTestId('navbar')).not.toBeInTheDocument();
});

test('/ renders home page if authorized === true', () => {
  history.push('/');
  store = mockStore({ auth: { authorized: true } });
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

  );
  expect(queryByTestId('signin-form')).not.toBeInTheDocument();
  expect(queryByTestId('image-gallery')).toBeInTheDocument();
  expect(queryByTestId('navbar')).toBeInTheDocument();
  expect(queryByTestId('drawer')).not.toBeInTheDocument();
});

test('/sign-in renders signIn if authorized === false', () => {
  history.push('/sign-in');
  store = mockStore({ auth: { authorized: false } });
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(queryByTestId('signin-form')).toBeInTheDocument();
  expect(queryByTestId('navbar')).not.toBeInTheDocument();
  expect(queryByTestId('drawer')).not.toBeInTheDocument();
});

test('/sign-in redirects to / if authorized === true', () => {
  history.push('/sign-in');
  store = mockStore({ auth: { authorized: true } });
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(queryByTestId('signin-form')).not.toBeInTheDocument();
  expect(queryByTestId('navbar')).toBeInTheDocument();
  expect(queryByTestId('drawer')).not.toBeInTheDocument();
});

test('/sign-up renders signUp', () => {
  history.push('/sign-up');
  store = mockStore({ auth: { authorized: false } });
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(queryByTestId('signup-form')).toBeInTheDocument();
  expect(queryByTestId('navbar')).not.toBeInTheDocument();
});
