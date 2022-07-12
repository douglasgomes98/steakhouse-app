import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { lazily } from 'react-lazily';

const { Login } = lazily(
  () => import('@/modules/authentication/containers/Login'),
);

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
