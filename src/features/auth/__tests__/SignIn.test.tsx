import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../SignIn';

const authenticate = jest.fn();

afterEach(() => {
  authenticate.mockClear();
});

test('SignIn form submit button calls authenticate function', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <SignIn authenticate={authenticate} />
    </MemoryRouter>
  );

  const username = 'mockuser';
  const password = 'mockpass23';
  const basicAuth = { username, password };

  fireEvent.input(screen.getByRole('textbox', { name: 'Nazwa użytkownika' }), {
    target: { value: username }
  });
  fireEvent.input(screen.getByLabelText(/Hasło/), {
    target: { value: password }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

  expect(authenticate).toHaveBeenCalledWith(basicAuth);
  expect(queryByText(/Wpisz co najmniej/)).not.toBeInTheDocument();
});

test('SignIn form shows error if password is too short', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <SignIn authenticate={authenticate} />
    </MemoryRouter>
  );

  const username = 'mockuser';
  const password = 'm';

  fireEvent.input(screen.getByRole('textbox', { name: 'Nazwa użytkownika' }), {
    target: { value: username }
  });
  fireEvent.input(screen.getByLabelText(/Hasło/), {
    target: { value: password }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

  expect(authenticate).not.toHaveBeenCalled();
  expect(queryByText(/Wpisz co najmniej/)).toBeInTheDocument();
});

test('SignIn form shows error if username is too long', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <SignIn authenticate={authenticate} />
    </MemoryRouter>
  );

  const username = 'veeeeeryLooooongUsername';
  const password = 'mockpass23';

  fireEvent.input(screen.getByRole('textbox', { name: 'Nazwa użytkownika' }), {
    target: { value: username }
  });
  fireEvent.input(screen.getByLabelText(/Hasło/), {
    target: { value: password }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

  expect(authenticate).not.toHaveBeenCalled();
  expect(queryByText(/Wpisz nie więcej/)).toBeInTheDocument();
});

test('SignIn form shows error if username contains spaces', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <SignIn authenticate={authenticate} />
    </MemoryRouter>
  );

  const username = 'mock user ';
  const password = 'mockpass23';

  fireEvent.input(screen.getByRole('textbox', { name: 'Nazwa użytkownika' }), {
    target: { value: username }
  });
  fireEvent.input(screen.getByLabelText(/Hasło/), {
    target: { value: password }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

  expect(authenticate).not.toHaveBeenCalled();
  expect(queryByText(/Nazwa użytkownika nie może zawierać spacji/)).toBeInTheDocument();
});
