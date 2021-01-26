import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../SignIn';

const authenticate = jest.fn();

afterEach(() => {
  authenticate.mockClear();
});

test('SignIn form', () => {
  render(
    <MemoryRouter>
      <SignIn authenticate={authenticate} />
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

  expect(authenticate).toHaveBeenCalledWith(basicAuth);
});
