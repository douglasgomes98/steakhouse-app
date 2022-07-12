import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazily } from 'react-lazily';
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
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        <Route
          path={routes.dashboard}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to={routes.dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
}
