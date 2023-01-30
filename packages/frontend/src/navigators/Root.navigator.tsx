import { Route, Routes, useNavigate } from 'react-router-dom';
import { UIPaths } from '../config/paths.config';
import { SsoLoginPage } from '../pages/SsoLogin.page';
import { useAuthContext } from '../context/auth.context';
import { AdminNavigator } from './Admin.navigator';
import { MainLayout } from '../layout/MainLayout';
import { NotFoundPage } from '../pages/NotFound.page';
import { l } from '../utils/language';

export function RootNavigator() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  if (isAuthenticated) return <AdminNavigator />;
  return (
    <MainLayout>
      <Routes>
        <Route path={UIPaths.LOGIN} element={<SsoLoginPage />} />
        <Route
          path='*'
          element={
            <NotFoundPage onAction={() => navigate(UIPaths.LOGIN)} actionLabel={l('page.notFound.actionLabel')} />
          }
        />
      </Routes>
    </MainLayout>
  );
}
