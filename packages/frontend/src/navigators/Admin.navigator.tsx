import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { AdminLayout } from '../layout/AdminLayout';
import { FillPollPage } from '../pages/poll/FillPoll.page';
import { FillPollSuccessPage } from '../pages/poll/FillPollSuccess.page';
import { NotFoundPage } from '../pages/utility/NotFound.page';
import { l } from '../utils/language';
import { useRouteItems } from '../utils/useRouteItems';

export function AdminNavigator() {
  const routeItems = useRouteItems();
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Routes>
        {routeItems?.map((mi) => (
          <Route key={mi.path} element={<mi.page />} path={mi.path} />
        ))}
        <Route path={UIPaths.FILL_POLL} element={<FillPollPage />} />
        <Route path={UIPaths.FILL_SUCCESS} element={<FillPollSuccessPage />} />
        <Route index element={<Navigate to={UIPaths.DASHBOARD} />} />
        <Route
          path='*'
          element={<NotFoundPage onAction={() => navigate(UIPaths.DASHBOARD)} actionLabel={l('title.dashboard')} />}
        />
      </Routes>
    </AdminLayout>
  );
}
