import { Route, Routes, useNavigate } from 'react-router-dom';

import { UIPaths } from '../config/paths.config';
import { AdminLayout } from '../layout/AdminLayout';
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
        <Route
          path='*'
          element={<NotFoundPage onAction={() => navigate(UIPaths.DASHBOARD)} actionLabel={l('title.dashboard')} />}
        />
      </Routes>
    </AdminLayout>
  );
}
