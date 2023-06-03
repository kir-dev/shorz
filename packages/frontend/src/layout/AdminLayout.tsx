import { Grid } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { DesktopNavbar } from '../components/DesktopNavbar';
import { MainLayout } from './MainLayout';

export function AdminLayout({ children }: PropsWithChildren) {
  return (
    <MainLayout drawerEnabled>
      <Grid templateColumns={['100%', null, 'auto 1fr']} templateRows='100%' overflow='hidden' gridGap={3} h='100%'>
        <DesktopNavbar />
        {children}
      </Grid>
    </MainLayout>
  );
}
