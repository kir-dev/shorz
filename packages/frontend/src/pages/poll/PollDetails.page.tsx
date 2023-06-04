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
import { TbQuestionCircle } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { IconLabel } from '../../components/common/IconLabel';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useDeletePoll } from '../../network/poll/useDeletePoll.network';
import { usePoll } from '../../network/poll/usePoll.network';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function PollDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = usePoll(id);
  const {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    mutate,
  } = useDeletePoll(id, () => navigate(UIPaths.POLL));
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || isDeleteError) return <ErrorPage />;
  const onDelete = () => {
    mutate(undefined);
  };
  return (
    <Page title={data.name || l('title.unknown')} isLoading={isLoading}>
      <CardBody>
        <VStack w='100%' align='flex-start' spacing={5}>
          <Box>
            <IconLabel text={l('page.pollDetails.question')} icon={<TbQuestionCircle />} />
            <Text>{data.question}</Text>
          </Box>
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
