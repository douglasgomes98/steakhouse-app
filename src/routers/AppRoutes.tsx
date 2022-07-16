import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazily } from 'react-lazily';
import { Suspense } from 'react';
import { AuthRoute } from './components/AuthRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { routes } from './constants/routes';

const { Login } = lazily(
  () => import('@/modules/authentication/containers/Login'),
);
const { Dashboard } = lazily(
  () => import('@/modules/home/containers/Dashboard'),
);

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.login}
          element={
            <Suspense fallback={<>loading...</>}>
              <AuthRoute>
                <Login />
              </AuthRoute>
            </Suspense>
          }
        />

        <Route
          path={routes.dashboard}
          element={
            <Suspense fallback={<>loading...</>}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route path="/" element={<Navigate to={routes.dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
}
