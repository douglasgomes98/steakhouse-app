import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';
import { generateId } from '@/helpers';

type UseSteaksProps = {
  steaks: Steak[];
  actions: UseSteaksMethodActions;
};

export type Steak = {
  id: string;
  description: string;
  date: Date;
  observation?: string;
};

type CreateSteakData = Omit<Steak, 'id'>;

type UseSteaksMethodActions = {
  createSteak: (steak: CreateSteakData) => void;
  removeSteak: (id: string) => void;
};

type InitialState = Omit<UseSteaksProps, 'actions'>;

const initialState: InitialState = {
  steaks: [],
};

export const useSteaks = create(
  persist<UseSteaksProps>(
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
              };

              state.steaks = [newSteakData, ...state.steaks];
            });
          },
          removeSteak: (id: string) => {
            setState(state => {
              state.steaks = state.steaks.filter(steak => steak.id !== id);
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
