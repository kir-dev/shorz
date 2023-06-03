import { Route, Routes, useNavigate } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { MainLayout } from '../layout/MainLayout';
import { LandingPage } from '../pages/Landing.page';
import { NotFoundPage } from '../pages/NotFound.page';
import { SsoLoginPage } from '../pages/SsoLogin.page';
import { l } from '../utils/language';
import { AdminNavigator } from './Admin.navigator';

export function RootNavigator() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  if (isAuthenticated) return <AdminNavigator />;
  return (
    <MainLayout>
      <Routes>
        <Route path={UIPaths.LOGIN} element={<SsoLoginPage />} />
        <Route index element={<LandingPage />} />
        <Route
          path='*'
          element={
            <NotFoundPage onAction={() => navigate(UIPaths.ROOT)} actionLabel={l('page.notFound.actionLabel')} />
          }
        />
      </Routes>
    </MainLayout>
  );
}
