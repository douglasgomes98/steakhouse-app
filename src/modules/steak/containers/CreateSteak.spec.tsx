import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { formatCurrency } from '@/helpers';
import { CreateSteak } from './CreateSteak';

const makeSut = () => {
  render(
    <BrowserRouter>
      <CreateSteak />
    </BrowserRouter>,
  );

  const inputDescription = screen.getByRole('textbox', {
    name: /descrição/i,
  });
  const inputDate = screen.getByRole('textbox', {
    name: /data/i,
  });
  const inputObservation = screen.getByRole('textbox', {
    name: /observação/i,
  });
  const inputMinValueWithoutBeer = screen.getByRole('textbox', {
    name: /valor mínimo sem cerveja/i,
  });
  const inputMinValueWithBeer = screen.getByRole('textbox', {
    name: /valor mínimo com cerveja/i,
  });
  const buttonSubmit = screen.getByRole('button', { name: /criar churras/i });

  return {
    inputDescription,
    inputDate,
    inputObservation,
    inputMinValueWithoutBeer,
    inputMinValueWithBeer,
    buttonSubmit,
  };
};

describe('CreateSteak', () => {
  test('should render a create steak form', () => {
    const {
      inputDescription,
      inputDate,
      inputObservation,
      inputMinValueWithoutBeer,
      inputMinValueWithBeer,
      buttonSubmit,
    } = makeSut();

    expect(inputDescription).toBeInTheDocument();
    expect(inputDate).toBeInTheDocument();
    expect(inputObservation).toBeInTheDocument();
    expect(inputMinValueWithoutBeer).toBeInTheDocument();
    expect(inputMinValueWithBeer).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(inputDescription).toHaveValue('');
    expect(inputDate).toHaveValue('');
    expect(inputObservation).toHaveValue('');
    expect(inputMinValueWithoutBeer).toHaveValue(formatCurrency(0));
    expect(inputMinValueWithBeer).toHaveValue(formatCurrency(0));
    expect(buttonSubmit).not.toBeDisabled();
  });

  test("should display an error message if the user doesn't fill correctly fields", async () => {
    const {
      inputDescription,
      inputDate,
      inputObservation,
      inputMinValueWithoutBeer,
      inputMinValueWithBeer,
      buttonSubmit,
    } = makeSut();

    expect(inputDescription).toHaveValue('');
    expect(inputDate).toHaveValue('');
    expect(inputObservation).toHaveValue('');
    expect(inputMinValueWithoutBeer).toHaveValue(formatCurrency(0));
    expect(inputMinValueWithBeer).toHaveValue(formatCurrency(0));
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/descrição é um campo obrigatório/i),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/data é um campo obrigatório/i),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo sem cerveja inválido/i),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo com cerveja inválido/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(inputDescription, {
      target: { value: '' },
    });
    fireEvent.change(inputDate, {
      target: { value: '21' },
    });
    fireEvent.change(inputObservation, {
      target: { value: 'any_observation' },
    });
    fireEvent.change(inputMinValueWithoutBeer, {
      target: { value: '0' },
    });
    fireEvent.change(inputMinValueWithBeer, {
      target: { value: '0' },
    });

    await waitFor(() => {
      expect(inputDescription).toHaveValue('');
      expect(inputDate).toHaveValue('21/MM/AAAA');
      expect(inputObservation).toHaveValue('any_observation');
      expect(inputMinValueWithoutBeer).toHaveValue(formatCurrency(0));
      expect(inputMinValueWithBeer).toHaveValue(formatCurrency(0));

      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/descrição é um campo obrigatório/i),
      ).toBeInTheDocument();
      expect(screen.queryByText(/data inválida/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo sem cerveja inválido/i),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo com cerveja inválido/i),
      ).toBeInTheDocument();
    });
  });

  test('should not display an error message if the user fills correctly fields', async () => {
    const {
      inputDescription,
      inputDate,
      inputObservation,
      inputMinValueWithoutBeer,
      inputMinValueWithBeer,
      buttonSubmit,
    } = makeSut();

    expect(inputDescription).toHaveValue('');
    expect(inputDate).toHaveValue('');
    expect(inputObservation).toHaveValue('');
    expect(inputMinValueWithoutBeer).toHaveValue(formatCurrency(0));
    expect(inputMinValueWithBeer).toHaveValue(formatCurrency(0));
    expect(buttonSubmit).not.toBeDisabled();

    fireEvent.change(inputDescription, {
      target: { value: 'any_description' },
    });
    fireEvent.change(inputDate, {
      target: { value: '21/01/2025' },
    });
    fireEvent.change(inputObservation, {
      target: { value: 'any_observation' },
    });
    fireEvent.change(inputMinValueWithoutBeer, {
      target: { value: '15000' },
    });
    fireEvent.change(inputMinValueWithBeer, {
      target: { value: '20000' },
    });

    await waitFor(() => {
      expect(inputDescription).toHaveValue('any_description');
      expect(inputDate).toHaveValue('21/01/2025');
      expect(inputObservation).toHaveValue('any_observation');
      expect(inputMinValueWithoutBeer).toHaveValue(formatCurrency(150));
      expect(inputMinValueWithBeer).toHaveValue(formatCurrency(200));

      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/descrição é um campo obrigatório/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/data inválida/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo sem cerveja inválido/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/valor mínimo com cerveja inválido/i),
      ).not.toBeInTheDocument();
    });
  });
});
