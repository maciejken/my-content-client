import React from 'react';
import * as redux from 'react-redux';
import * as auth from '../../../src/features/auth/authSlice';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../../../src/features/auth/SignIn';

let useDispatchSpy: jest.SpyInstance;
let mockDispatchFn: jest.SpyInstance;
let signInSpy: jest.SpyInstance;

beforeAll(() => {
  useDispatchSpy = jest.spyOn(redux, 'useDispatch');
  mockDispatchFn = jest.fn();
  signInSpy = jest.spyOn(auth, 'signIn');
});

afterEach(() => {
  signInSpy.mockClear();
});

test('SignIn form', () => {
  useDispatchSpy.mockReturnValue(mockDispatchFn);
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );

  const username = 'mockuser';
  const password = 'mockpass';
  const basicAuth = { username, password };

  fireEvent.input(screen.getByTestId('signin-username'), {
    target: { value: username }
  });
  fireEvent.input(screen.getByTestId('signin-password'), {
    target: { value: password }
  });
  fireEvent.click(screen.getByTestId('signin-submit'));

  expect(signInSpy).toHaveBeenCalledWith(basicAuth);
});