import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

type UseAuthenticationProps = {
  isAuthenticated: boolean;
  actions: UseBankingPaymentMethodActions;
};

type UseBankingPaymentMethodActions = {
  login: () => void;
  logout: () => void;
};

type InitialState = Omit<UseAuthenticationProps, 'actions'>;

const initialState: InitialState = {
  isAuthenticated: false,
};

export const useAuthentication = create<UseAuthenticationProps>()(
  persist(
    set => {
      const setState = (fn: (state: UseAuthenticationProps) => void) =>
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
