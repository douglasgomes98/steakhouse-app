import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazily } from 'react-lazily';
import { AuthRoute } from './components/AuthRoute';
import { routes } from './constants/routes';

const { Login } = lazily(
  () => import('@/modules/authentication/containers/Login'),
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

        <Route path="/" element={<Navigate to={routes.login} />} />
      </Routes>
    </BrowserRouter>
  );
}
