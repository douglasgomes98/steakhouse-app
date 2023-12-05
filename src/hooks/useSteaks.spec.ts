import { beforeEach, describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useSteaks } from './useSteaks';

describe('useSteaks', () => {
  const initialStoreState = useSteaks.getState();

  beforeEach(() => {
    useSteaks.setState(initialStoreState, true);
  });

  test('should render hook correctly', () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);
  });

  test('should add a new steak', async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);
    expect(result.current.steaks[0]).toHaveProperty('id');
    expect(result.current.steaks[0].description).toEqual('any_description');
    expect(result.current.steaks[0].date).toEqual(today);
    expect(result.current.steaks[0].observation).toEqual('any_observation');
    expect(result.current.steaks[0].minValueWithBeerByPeople).toEqual(15);
    expect(result.current.steaks[0].minValueWithoutBeerByPeople).toEqual(10);
    expect(result.current.steaks[0].amountPayed).toEqual(0);
    expect(result.current.steaks[0].peoples).toEqual([]);
  });

  test('should remove a steak', async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.removeSteak(result.current.steaks[0].id);
    });

    expect(result.current.steaks).toEqual([]);
  });

  test('should add a people to a steak', async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);
    expect(result.current.steaks[0].peoples[0]).toHaveProperty('id');
    expect(result.current.steaks[0].peoples[0].name).toEqual('any_name');
    expect(result.current.steaks[0].peoples[0].amount).toEqual(10);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);
  });

  test('should remove a people from a steak', async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);

    act(() => {
      result.current.actions.removePeople(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toEqual([]);
  });

  test('should change a people payment', async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);

    act(() => {
      result.current.actions.changePeoplePayment(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(true);
    expect(result.current.steaks[0].amountPayed).toEqual(10);
  });

  test("should recalculate steak's amount payed when a people is removed", async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);

    act(() => {
      result.current.actions.changePeoplePayment(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(true);
    expect(result.current.steaks[0].amountPayed).toEqual(10);

    act(() => {
      result.current.actions.removePeople(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toEqual([]);
    expect(result.current.steaks[0].amountPayed).toEqual(0);
  });

  test("should recalculate steak's amount payed when a people is added", async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);

    act(() => {
      result.current.actions.changePeoplePayment(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(true);
    expect(result.current.steaks[0].amountPayed).toEqual(10);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(2);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(true);
    expect(result.current.steaks[0].peoples[1].isPayed).toEqual(false);
    expect(result.current.steaks[0].amountPayed).toEqual(10);
  });

  test("should recalculate steak's amount payed when a people payment is changed", async () => {
    const { result } = renderHook(() => useSteaks());

    expect(result.current.steaks).toEqual([]);

    const today = new Date();

    act(() => {
      result.current.actions.createSteak({
        date: today,
        description: 'any_description',
        minValueWithBeerByPeople: 15,
        minValueWithoutBeerByPeople: 10,
        observation: 'any_observation',
      });
    });

    expect(result.current.steaks).toHaveLength(1);

    act(() => {
      result.current.actions.addPeople(
        {
          name: 'any_name',
          amount: 10,
        },
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples).toHaveLength(1);
    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);

    act(() => {
      result.current.actions.changePeoplePayment(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(true);
    expect(result.current.steaks[0].amountPayed).toEqual(10);

    act(() => {
      result.current.actions.changePeoplePayment(
        result.current.steaks[0].peoples[0].id,
        result.current.steaks[0].id,
      );
    });

    expect(result.current.steaks[0].peoples[0].isPayed).toEqual(false);
    expect(result.current.steaks[0].amountPayed).toEqual(0);
  });
});
