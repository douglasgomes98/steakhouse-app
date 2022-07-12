import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthentication } from '@/hooks/useAuthentication';
import { mountQueryParams } from '@/helpers/mountQueryParams';
import { redirectRoutesBlackList } from '../constants/redirectRoutesBlackList';
import { routes } from '../constants/routes';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  const { isAuthenticated } = useAuthentication();

  if (!isAuthenticated) {
    const currentRouteIsBlockedForRedirect = redirectRoutesBlackList.some(
      route => route === location.pathname,
    );

    return (
      <Navigate
        to={{
          pathname: routes.login,
          search: currentRouteIsBlockedForRedirect
            ? ''
            : mountQueryParams({
                redirect: location.pathname.concat(location.search),
              }),
        }}
        replace
      />
    );
  }

  return children as JSX.Element;
}
