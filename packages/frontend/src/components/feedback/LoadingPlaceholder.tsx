import { MainLayout } from '../../layout/MainLayout';
import { LoadingPage } from '../../pages/utility/Loading.page';

export function LoadingPlaceholder() {
  return (
    <MainLayout>
      <LoadingPage />
    </MainLayout>
  );
}
