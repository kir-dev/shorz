import { ButtonGroup, CardBody, CardFooter, VStack } from '@chakra-ui/react';

import { NavButton } from '../../components/button/NavButton';
import { EmptyListPlaceholder } from '../../components/feedback/EmptyListPlaceholder';
import { LinkListItem } from '../../components/link/LinkListItem';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useLinks } from '../../network/link/useLinks.network';
import { l } from '../../utils/language';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function LinksPage() {
  const { isLoading, data, isError } = useLinks();
  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  return (
    <Page title={l('title.links')}>
      <CardBody>
        <VStack w='100%'>
          {data && data.length > 0 ? (
            data.map((link) => <LinkListItem link={link} key={link._id} />)
          ) : (
            <EmptyListPlaceholder />
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={UIPaths.NEW_LINK}>{l('button.create')}</NavButton>
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
