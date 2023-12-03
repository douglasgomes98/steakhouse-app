import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { generateId } from '@/helpers';

type UseSteaksProps = {
  steaks: Steak[];
  actions: UseSteaksMethodActions;
};

type People = {
  id: string;
  name: string;
  amount: number;
  isPayed: boolean;
};

export type Steak = {
  id: string;
  description: string;
  date: Date;
  observation?: string;
  minValueWithoutBeerByPeople: number;
  minValueWithBeerByPeople: number;
  amountPayed: number;
  peoples: People[];
};

type CreateSteakData = Omit<Steak, 'id' | 'peoples' | 'amountPayed'>;
type CreatePeopleData = Omit<People, 'id' | 'isPayed'>;

type UseSteaksMethodActions = {
  createSteak: (steak: CreateSteakData) => void;
  removeSteak: (id: string) => void;
  addPeople: (people: CreatePeopleData, steakId: string) => void;
  removePeople: (peopleId: string, steakId: string) => void;
  changePeoplePayment: (id: string, steakId: string) => void;
};

type InitialState = Omit<UseSteaksProps, 'actions'>;

const initialState: InitialState = {
  steaks: [],
};

export const useSteaks = create<UseSteaksProps>()(
  persist(
    set => {
      const setState = (fn: (state: UseSteaksProps) => void) =>
        set(produce(fn));

      return {
        ...initialState,
        actions: {
          createSteak: (steak: CreateSteakData) => {
            setState(state => {
              const newSteakData = {
                ...steak,
                id: generateId(),
                peoples: [],
                amountPayed: 0,
              };

              state.steaks = [newSteakData, ...state.steaks];
            });
          },
          removeSteak: (id: string) => {
            setState(state => {
              state.steaks = state.steaks.filter(steak => steak.id !== id);
            });
          },
          addPeople: (people: CreatePeopleData, steakId: string) => {
            setState(state => {
              const currentSteak = state.steaks.find(
                steak => steak.id === steakId,
              );

              if (currentSteak) {
                const newPeople = {
                  ...people,
                  id: generateId(),
                  isPayed: false,
                };

                currentSteak.peoples = [...currentSteak.peoples, newPeople];
              }
            });
          },
          removePeople: (peopleId: string, steakId: string) => {
            setState(state => {
              const currentSteak = state.steaks.find(
                steak => steak.id === steakId,
              );

              if (currentSteak) {
                const currentPeople = currentSteak.peoples.find(
                  people => people.id === peopleId,
                );

                if (currentPeople) {
                  currentSteak.peoples = currentSteak.peoples.filter(
                    people => people.id !== peopleId,
                  );

                  const payedAmount = currentSteak.peoples
                    .filter(people => people.isPayed)
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.amount,
                      0,
                    );

                  currentSteak.amountPayed = payedAmount;
                }
              }
            });
          },
          changePeoplePayment: (id: string, steakId: string) => {
            setState(state => {
              const currentSteak = state.steaks.find(
                steak => steak.id === steakId,
              );

              if (currentSteak) {
                const currentPeople = currentSteak.peoples.find(
                  people => people.id === id,
                );

                if (currentPeople) {
                  currentPeople.isPayed = !currentPeople.isPayed;

                  const payedAmount = currentSteak.peoples
                    .filter(people => people.isPayed)
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.amount,
                      0,
                    );

                  currentSteak.amountPayed = payedAmount;
                }
              }
            });
          },
        },
      };
    },
    {
      name: 'useSteaks',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['actions'].includes(key)),
        ),
    },
  ),
);
