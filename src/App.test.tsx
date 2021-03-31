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

describe('App routes', () => {
  beforeEach(() => {
    history = createBrowserHistory();
  });

  describe('/', () => {
    it('redirects to /sign-in if not authorized', () => {
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

    it('renders home page if authorized', () => {
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
  })

  describe('/sign-in', () => {
    it('renders signIn component if not authorized', () => {
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

    it('redirects to / if authorized', () => {
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
  });

  describe('/sign-up', () => {
    it('renders signUp component', () => {
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
  });
});


