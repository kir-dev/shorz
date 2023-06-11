import { Route, Routes, useNavigate } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { MainLayout } from '../layout/MainLayout';
import { FillPollPage } from '../pages/poll/FillPoll.page';
import { FillPollSuccessPage } from '../pages/poll/FillPollSuccess.page';
import { LandingPage } from '../pages/public/Landing.page';
import { SsoLoginPage } from '../pages/public/SsoLogin.page';
import { NotFoundPage } from '../pages/utility/NotFound.page';
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
        <Route path={UIPaths.FILL_POLL} element={<FillPollPage />} />
        <Route path={UIPaths.FILL_SUCCESS} element={<FillPollSuccessPage />} />
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
