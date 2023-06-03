import { CardBody, Wrap } from '@chakra-ui/react';

import { DashboardTile } from '../components/DashboardTile';
import { EmptyListPlaceholder } from '../components/EmptyListPlaceholder';
import { Page } from '../layout/Page';
import { useLinks } from '../network/useLinks.network';
import { l } from '../utils/language';
import { ErrorPage } from './Error.page';
import { LoadingPage } from './Loading.page';

export function DashboardPage() {
  const { isLoading, data, isError } = useLinks();

  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  return (
    <Page title={l('title.dashboard')}>
      <CardBody>
        {data.length > 0 ? (
          <Wrap>
            {data?.map((link) => (
              <DashboardTile link={link} key={link._id} />
            ))}
          </Wrap>
        ) : (
          <EmptyListPlaceholder hideArrow />
        )}
      </CardBody>
    </Page>
  );
}
