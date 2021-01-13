import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history';
import { store } from './app/store';
import App from './App';
import { initialState, setAuthExpires } from './features/auth/authSlice';

let history: History;

beforeEach(() => {
  store.dispatch(setAuthExpires(initialState.expires));
  history = createBrowserHistory();
});

test('/ redirects to /sign-in if authExpires is not set', () => {
  history.push('/');
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

test('/ renders home page if authExpires is set', () => {
  store.dispatch(setAuthExpires(1));
  history.push('/');
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

test('/sign-in renders signIn if authExpires is not set', () => {
  history.push('/sign-in');
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

test('/sign-in redirects to / if authExpires is set', () => {
  history.push('/sign-in');
  store.dispatch(setAuthExpires(1));
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

test('/sign-up renders signUp', async () => {
  history.push('/sign-up');

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
