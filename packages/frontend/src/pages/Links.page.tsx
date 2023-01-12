import { Page } from '../layout/Page';
import { l } from '../utils/language';
import { useLinks } from '../network/useLinks.network';
import { ButtonGroup, CardBody, CardFooter, VStack } from '@chakra-ui/react';
import { LinkListItem } from '../components/LinkListItem';
import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { EmptyListPlaceholder } from '../components/EmptyListPlaceholder';
import { LoadingPage } from './Loading.page';
import { ErrorPage } from './Error.page';

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
