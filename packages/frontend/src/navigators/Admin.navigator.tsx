import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layout/AdminLayout';
import { useRouteItems } from '../utils/useRouteItems';
import { NotFoundPage } from '../pages/NotFound.page';

export function AdminNavigator() {
  const routeItems = useRouteItems();
  return (
    <AdminLayout>
      <Routes>
        {routeItems?.map((mi) => (
          <Route key={mi.path} element={<mi.page />} path={mi.path} />
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AdminLayout>
  );
}
