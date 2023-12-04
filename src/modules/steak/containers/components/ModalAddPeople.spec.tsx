import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ModalAddPeople, ModalAddPeopleProps } from './ModalAddPeople';

const makeSut = () => {
  const mockedProps: ModalAddPeopleProps = {
    isOpen: true,
    currentSteakId: 'fake_id',
    minValueWithBeer: 0,
    minValueWithoutBeer: 0,
    onClose: vi.fn(),
  };

  render(<ModalAddPeople {...mockedProps} />);

  const inputName = screen.getByRole('textbox', { name: /nome/i });
  const withBeerRadio = screen.getByRole('radio', {
    name: /com cerveja/i,
  });
  const withoutBeerRadio = screen.getByRole('radio', {
    name: /sem cerveja/i,
  });
  const buttonSubmit = screen.getByRole('button', { name: /adicionar/i });

  return {
    inputName,
    withBeerRadio,
    withoutBeerRadio,
    buttonSubmit,
  };
};

describe('ModalAddPeople', () => {
  test('should render a add people to steak form', () => {
    const { inputName, withBeerRadio, withoutBeerRadio, buttonSubmit } =
      makeSut();

    expect(inputName).toBeInTheDocument();
    expect(withBeerRadio).toBeInTheDocument();
    expect(withoutBeerRadio).toBeInTheDocument();
    expect(buttonSubmit).not.toBeDisabled();
    expect(inputName).toHaveValue('');
    expect(withBeerRadio).not.toBeChecked();
    expect(withoutBeerRadio).toBeChecked();
  });

  test("should display an error message if the user doesn't fill correctly fields", async () => {
    const { inputName, withBeerRadio, withoutBeerRadio, buttonSubmit } =
      makeSut();

    expect(inputName).toBeInTheDocument();
    expect(withBeerRadio).toBeInTheDocument();
    expect(withoutBeerRadio).toBeInTheDocument();
    expect(buttonSubmit).not.toBeDisabled();
    expect(inputName).toHaveValue('');
    expect(withBeerRadio).not.toBeChecked();
    expect(withoutBeerRadio).toBeChecked();

    fireEvent.click(buttonSubmit);

    await waitFor(() => {
      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/nome é um campo obrigatório/i),
      ).toBeInTheDocument();
    });
  });

  test('should not display an error message if the user fills correctly fields', async () => {
    const { inputName, withBeerRadio, withoutBeerRadio, buttonSubmit } =
      makeSut();

    expect(inputName).toBeInTheDocument();
    expect(withBeerRadio).toBeInTheDocument();
    expect(withoutBeerRadio).toBeInTheDocument();
    expect(buttonSubmit).not.toBeDisabled();
    expect(inputName).toHaveValue('');
    expect(withBeerRadio).not.toBeChecked();
    expect(withoutBeerRadio).toBeChecked();

    fireEvent.change(inputName, { target: { value: 'any_name' } });

    await waitFor(() => {
      expect(inputName).toHaveValue('any_name');
      expect(buttonSubmit).not.toBeDisabled();
      expect(
        screen.queryByText(/nome é um campo obrigatório/i),
      ).not.toBeInTheDocument();
    });
  });

  test('should toggle radio button', async () => {
    const { withBeerRadio, withoutBeerRadio } = makeSut();

    expect(withBeerRadio).toBeInTheDocument();
    expect(withoutBeerRadio).toBeInTheDocument();

    expect(withBeerRadio).not.toBeChecked();
    expect(withoutBeerRadio).toBeChecked();

    fireEvent.click(withBeerRadio);

    await waitFor(() => {
      expect(withBeerRadio).toBeChecked();
      expect(withoutBeerRadio).not.toBeChecked();
    });

    fireEvent.click(withoutBeerRadio);

    await waitFor(() => {
      expect(withoutBeerRadio).toBeChecked();
      expect(withBeerRadio).not.toBeChecked();
    });
  });
});
