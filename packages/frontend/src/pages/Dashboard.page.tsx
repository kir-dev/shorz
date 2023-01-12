import { Page } from '../layout/Page';
import { l } from '../utils/language';
import { useLinks } from '../network/useLinks.network';
import { LoadingPage } from './Loading.page';
import { ErrorPage } from './Error.page';
import { CardBody, Wrap } from '@chakra-ui/react';
import { DashboardTile } from '../components/DashboardTile';
import { EmptyListPlaceholder } from '../components/EmptyListPlaceholder';

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
