import {
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

import { NavButton } from '../../components/button/NavButton';
import { AddMember } from '../../components/group/AddMember';
import { MemberListItem } from '../../components/group/MemberListItem';
import { PollListItem } from '../../components/poll/PollListItem';
import { PublicPollListItem } from '../../components/poll/PublicPollListItem';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useDeleteGroup } from '../../network/groups/useDeleteGroup.network';
import { useGroup } from '../../network/groups/useGroup.network';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function GroupDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, refetch } = useGroup(id || '');
  const {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    mutate,
  } = useDeleteGroup(id, () => navigate(UIPaths.GROUP));
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || isDeleteError) return <ErrorPage />;
  const onDelete = () => {
    mutate(undefined);
  };
  return (
    <Page title={data.name || l('title.unknown')} isLoading={isLoading}>
      <CardBody>
        <Text fontSize='xl'>{l('title.polls')}</Text>
        <VStack spacing={4} mt={2} alignItems='start'>
          {data.polls.map((poll) =>
            data.isAdmin ? (
              <PollListItem key={poll._id} poll={poll} />
            ) : (
              <PublicPollListItem key={poll._id} poll={poll} />
            )
          )}
          {data.polls.length === 0 && (
            <Text fontSize='sm' fontStyle='italic'>
              {l('page.groups.noPolls')}
            </Text>
          )}
          {data.isAdmin && (
            <NavButton to={joinPath(UIPaths.NEW_POLL + `?groupId=${id}`)}>{l('title.createPoll')}</NavButton>
          )}
        </VStack>
      </CardBody>
      <CardBody>
        <Text fontSize='xl'>{l('title.members')}</Text>
        <VStack spacing={4} mt={2}>
          {data.members.map((member) => (
            <MemberListItem
              onDelete={refetch}
              key={member._id}
              member={member}
              removeEnabled={data.isAdmin}
              groupId={id}
            />
          ))}
        </VStack>
        {data.isAdmin && <AddMember groupId={id} onAddMember={refetch} />}
      </CardBody>
      {data.isAdmin && (
        <CardFooter>
          <ButtonGroup>
            <NavButton to={joinPath(UIPaths.GROUP, id, 'edit')}>{l('button.edit')}</NavButton>
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
      )}
    </Page>
  );
}
