import create from 'zustand';
import { persist } from 'zustand/middleware';
import produce from 'immer';

type AuthenticationProps = {
  isAuthenticated: boolean;
  actions: UseBankingPaymentMethodActions;
};

type UseBankingPaymentMethodActions = {
  login: (username: string, password: string) => void;
  logout: () => void;
};

type InitialState = Omit<AuthenticationProps, 'actions'>;

const initialState: InitialState = {
  isAuthenticated: false,
};

export const useAuthentication = create(
  persist<AuthenticationProps>(
    set => {
      const setState = (fn: (state: AuthenticationProps) => void) =>
        set(produce(fn));

      return {
        ...initialState,
        actions: {
          login: () => {
            setState(state => {
              state.isAuthenticated = true;
            });
          },
          logout: () => {
            setState(state => {
              state.isAuthenticated = false;
            });
          },
        },
      };
    },
    {
      name: 'useAuthentication',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['actions'].includes(key)),
        ),
    },
  ),
);
