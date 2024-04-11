import { ButtonGroup, CardBody, CardFooter, VStack } from '@chakra-ui/react';

import { NavButton } from '../../components/button/NavButton';
import { EmptyListPlaceholder } from '../../components/feedback/EmptyListPlaceholder';
import { GroupListItem } from '../../components/group/GroupListItem';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useGroups } from '../../network/groups/useGroups.network';
import { l } from '../../utils/language';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function GroupsPage() {
  const { isLoading, data, isError } = useGroups();
  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  return (
    <Page title={l('title.groups')}>
      <CardBody>
        <VStack w='100%'>
          {data && data.length > 0 ? (
            data.map((group) => <GroupListItem group={group} key={group._id} />)
          ) : (
            <EmptyListPlaceholder />
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={UIPaths.NEW_GROUP}>{l('button.create')}</NavButton>
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
