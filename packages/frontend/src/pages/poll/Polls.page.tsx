import { ButtonGroup, CardBody, CardFooter, VStack } from '@chakra-ui/react';

import { NavButton } from '../../components/button/NavButton';
import { EmptyListPlaceholder } from '../../components/feedback/EmptyListPlaceholder';
import { PollListItem } from '../../components/poll/PollListItem';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { usePolls } from '../../network/poll/usePolls.network';
import { l } from '../../utils/language';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function PollsPage() {
  const { isLoading, data, isError } = usePolls();
  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  return (
    <Page title={l('title.polls')}>
      <CardBody>
        <VStack w='100%'>
          {data && data.length > 0 ? (
            data.map((poll) => <PollListItem poll={poll} key={poll._id} />)
          ) : (
            <EmptyListPlaceholder />
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={UIPaths.NEW_POLL}>{l('button.create')}</NavButton>
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
