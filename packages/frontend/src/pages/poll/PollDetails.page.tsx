import {
  Box,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { TbCheck, TbEye, TbLink, TbQuestionCircle, TbToggleLeft, TbToggleRight, TbWand } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { IconLabel } from '../../components/common/IconLabel';
import { UrlField } from '../../components/common/UrlField';
import { EmptyListPlaceholder } from '../../components/feedback/EmptyListPlaceholder';
import { SubmissionList } from '../../components/poll/SubmissionList';
import { CLIENT_BASE_URL, SHORTENED_BASE_URL } from '../../config/environment.config';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useCreateLink } from '../../network/link/useCreateLink.network';
import { useLinkByUrl } from '../../network/link/useLinkByUrl.network';
import { useDeletePoll } from '../../network/poll/useDeletePoll.network';
import { usePatchPoll } from '../../network/poll/usePatchPoll.network';
import { usePoll } from '../../network/poll/usePoll.network';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function PollDetailsPage() {
  const green = useColorModeValue('green.500', 'green.300');
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, refetch } = usePoll(id);
  const pollUrl = data ? joinPath(CLIENT_BASE_URL, 'p', data._id) : '';
  const link = useLinkByUrl(pollUrl);
  const createLink = useCreateLink(() => link.refetch());
  const pollPatch = usePatchPoll(id, refetch);
  const pollDelete = useDeletePoll(id, () => navigate(UIPaths.POLL));
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || pollDelete.isLoading) return <ErrorPage />;

  const onDelete = () => {
    pollDelete.mutate();
  };

  const onChangeState = (enabled: boolean) => {
    pollPatch.mutate({ enabled });
  };

  const onCreateLink = () => {
    createLink.mutate({ name: data.name + ' szavazás', url: pollUrl });
  };

  return (
    <Page overflow='hidden' title={data.name || l('title.unknown')} isLoading={isLoading}>
      <CardBody>
        <VStack w='100%' align='flex-start' spacing={5}>
          <Box>
            <IconLabel text={l('page.pollDetails.question')} icon={<TbQuestionCircle />} />
            <Text>{data.question}</Text>
          </Box>
          <Box maxW='100%'>
            <HStack spacing={5}>
              <IconLabel text={l('page.pollDetails.link')} icon={<TbLink />} />
              {link.data && (
                <HStack color={green}>
                  <TbCheck />
                  <Text>{l('page.pollDetails.shortened')}</Text>
                </HStack>
              )}
            </HStack>
            <Box maxW='100%' overflowY='auto'>
              <UrlField
                url={link.data && SHORTENED_BASE_URL ? joinPath(SHORTENED_BASE_URL, link.data.shortId) : pollUrl}
              />
            </Box>
            {!link.data && !link.isLoading && (
              <HStack>
                <Button leftIcon={<TbWand />} variant='ghost' onClick={onCreateLink}>
                  {l('page.pollDetails.shorten')}
                </Button>
              </HStack>
            )}
            {link.data && (
              <NavButton leftIcon={<TbEye />} variant='link' to={joinPath(UIPaths.LINK, link.data._id)}>
                {l('page.pollDetails.show')}
              </NavButton>
            )}
          </Box>
          <Box>
            <IconLabel
              text={l('page.pollDetails.enabled')}
              icon={data.enabled ? <TbToggleRight /> : <TbToggleLeft />}
            />
            <HStack>
              <Switch
                defaultChecked={data.enabled}
                checked={data.enabled}
                onChange={(e) => onChangeState(e.target.checked)}
              />
              {pollPatch.isLoading && <Spinner size='sm' />}
            </HStack>
            {pollPatch.isError && <Text color='red'>{l('error.general')}</Text>}
          </Box>
          {data.submissions.length > 0 ? (
            <SubmissionList answerOptions={data.answerOptions} submissions={data.submissions} />
          ) : (
            <EmptyListPlaceholder text={l('page.pollDetails.empty')} hideArrow />
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={joinPath(UIPaths.POLL, id, 'edit')}>{l('button.edit')}</NavButton>
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
                  <Button isLoading={pollPatch.isLoading} onClick={onDelete} colorScheme='red' variant='ghost'>
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
