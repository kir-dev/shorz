import { Page } from '../layout/Page';
import { l } from '../utils/language';
import {
  Box,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLink } from '../network/useLink.network';
import { UrlField } from '../components/UrlField';
import { LoadingPage } from './Loading.page';
import { ErrorPage } from './Error.page';
import { joinPath } from '../utils/path';
import { SHORTENED_BASE_URL } from '../config/environment.config';
import { ClickChart } from '../components/ClickChart';
import { IconLabel } from '../components/IconLabel';
import { TbExternalLink, TbFold } from 'react-icons/tb';
import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { useDeleteLink } from '../network/useDeleteLink.network';

export function LinkDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useLink(id || '');
  const { isLoading: isDeleteLoading, isError: isDeleteError, makeRequest } = useDeleteLink(id || '');
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || isDeleteError) return <ErrorPage />;
  const onDelete = () => {
    makeRequest(undefined, () => navigate(UIPaths.LINK));
  };
  return (
    <Page title={data.name || l('title.unknown')} isLoading={isLoading}>
      <CardBody>
        <VStack w='100%' align='flex-start' spacing={5}>
          <Box>
            <IconLabel text={l('page.linkDetails.fullUrl')} icon={<TbExternalLink />} />
            <UrlField url={data.url} />
          </Box>
          {SHORTENED_BASE_URL && (
            <Box>
              <IconLabel text={l('page.linkDetails.shortenedUrl')} icon={<TbFold />} />
              <UrlField url={joinPath(SHORTENED_BASE_URL, data.shortId)} />
            </Box>
          )}
          <ClickChart timestamps={data.timestamps} />
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={joinPath(UIPaths.LINK, id, 'edit')}>{l('button.edit')}</NavButton>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme='red' variant='ghost'>
                {l('button.delete')}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverArrow />
              <PopoverBody>
                <Text>{l('header.confirmDelete')}</Text>
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup>
                  <Button isLoading={isDeleteLoading} onClick={onDelete} colorScheme='red' variant='ghost'>
                    {l('button.delete')}
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </CardFooter>
    </Page>
  );
}
