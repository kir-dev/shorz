import { Route, Routes } from 'react-router-dom';
import { UIPaths } from '../config/paths.config';
import { SsoLoginPage } from '../pages/SsoLogin.page';
import { useAuthContext } from '../context/auth.context';
import { AdminNavigator } from './Admin.navigator';

export function RootNavigator() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) return <AdminNavigator />;
  return (
    <Routes>
      <Route path={UIPaths.LOGIN} element={<SsoLoginPage />} />
    </Routes>
  );
}
