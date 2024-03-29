import { ReactNode, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthentication } from '@/hooks';
import { parseQueryParams } from '@/helpers';
import { routes } from '../constants/routes';

export type AuthRouteProps = {
  children: ReactNode;
};

export function AuthRoute({ children }: AuthRouteProps) {
  const location = useLocation();

  const { isAuthenticated } = useAuthentication();

  const existsParams = useMemo(() => {
    return !!parseQueryParams(location.search)?.redirect;
  }, [location]);

  if (location.pathname === routes.login && !existsParams && isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: '/',
        }}
        replace
      />
    );
  }

  return children as JSX.Element;
}
