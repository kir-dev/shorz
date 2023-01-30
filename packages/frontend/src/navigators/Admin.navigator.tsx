import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../layout/AdminLayout';
import { useRouteItems } from '../utils/useRouteItems';
import { NotFoundPage } from '../pages/NotFound.page';
import { UIPaths } from '../config/paths.config';
import { l } from '../utils/language';

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
