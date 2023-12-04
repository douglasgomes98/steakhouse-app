import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Login } from './Login';

const makeSut = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );

  const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
  const inputPassword = screen.getByRole('textbox', { name: /senha/i });
  const buttonSubmit = screen.getByRole('button', { name: /entrar/i });

  return {
    inputEmail,
    inputPassword,
    buttonSubmit,
  };
};

describe('Login', () => {
  test('should render a login form', () => {
    const { inputEmail, inputPassword, buttonSubmit } = makeSut();

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(buttonSubmit).not.toBeDisabled();
  });

  test("should display an error message if the user doesn't fill correctly fields", async () => {
    const { inputEmail, inputPassword, buttonSubmit } = makeSut();

    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/e-mail é um campo obrigatório/i),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/senha é um campo obrigatório/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(inputEmail, { target: { value: 'any_email' } });
    fireEvent.change(inputPassword, { target: { value: '12345' } });

    await waitFor(() => {
      expect(inputEmail).toHaveValue('any_email');
      expect(inputPassword).toHaveValue('12345');

      expect(buttonSubmit).not.toBeDisabled();
      expect(screen.queryByText(/e-mail inválido/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/senha deve ter pelo menos 8 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  test('should not display an error message if the user fills correctly fields', async () => {
    const { inputEmail, inputPassword, buttonSubmit } = makeSut();

    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.change(inputEmail, {
      target: { value: 'jhondoe@email.com' },
    });
    fireEvent.change(inputPassword, { target: { value: '12345678' } });

    await waitFor(() => {
      expect(inputEmail).toHaveValue('jhondoe@email.com');
      expect(inputPassword).toHaveValue('12345678');

      expect(buttonSubmit).not.toBeDisabled();
      expect(screen.queryByText(/e-mail inválido/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/senha deve ter pelo menos 8 caracteres/i),
      ).not.toBeInTheDocument();
    });
  });

  test('should show password if the user clicks on the icon', async () => {
    const { inputPassword } = makeSut();

    expect(inputPassword).toHaveAttribute('type', 'password');

    const icon = screen.getByRole('button', {
      name: /icon-password/i,
    });

    fireEvent.click(icon);

    await waitFor(() => {
      expect(inputPassword).toHaveAttribute('type', 'text');
    });

    fireEvent.click(icon);

    await waitFor(() => {
      expect(inputPassword).toHaveAttribute('type', 'password');
    });
  });
});
