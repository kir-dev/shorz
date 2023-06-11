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
  VStack,
} from '@chakra-ui/react';
import { TbLink, TbQuestionCircle, TbToggleLeft, TbToggleRight } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { IconLabel } from '../../components/common/IconLabel';
import { UrlField } from '../../components/common/UrlField';
import { EmptyListPlaceholder } from '../../components/feedback/EmptyListPlaceholder';
import { SubmissionList } from '../../components/poll/SubmissionList';
import { CLIENT_BASE_URL } from '../../config/environment.config';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useDeletePoll } from '../../network/poll/useDeletePoll.network';
import { usePatchPoll } from '../../network/poll/usePatchPoll.network';
import { usePoll } from '../../network/poll/usePoll.network';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function PollDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, refetch } = usePoll(id);
  const { isLoading: isPatchLoading, isError: isPatchError, mutate: patch } = usePatchPoll(id, refetch);
  const {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    mutate: deletePoll,
  } = useDeletePoll(id, () => navigate(UIPaths.POLL));
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || isDeleteError) return <ErrorPage />;

  const onDelete = () => {
    deletePoll();
  };

  const onChangeState = (enabled: boolean) => {
    patch({ enabled });
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
            <IconLabel text={l('page.pollDetails.question')} icon={<TbLink />} />
            <Box maxW='100%' overflowY='auto'>
              <UrlField url={joinPath(CLIENT_BASE_URL, 'p', data._id)} />
            </Box>
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
              {isPatchLoading && <Spinner size='sm' />}
            </HStack>
            {isError && <Text color='red'>{l('error.general')}</Text>}
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
