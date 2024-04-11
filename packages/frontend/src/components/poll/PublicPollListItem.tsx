import { Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { TbChevronRight, TbCircle, TbCircleCheckFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { PollWithSubmissionsDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

interface PublicPollListItemProps {
  poll: PollWithSubmissionsDocument;
}
export function PublicPollListItem({ poll }: PublicPollListItemProps) {
  const color = useColorModeValue('gray.100', 'gray.600');
  const navigate = useNavigate();
  const isDisabled = !poll.enabled;
  const onClick = () => {
    if (isDisabled) return;
    navigate(joinPath('/p', poll._id));
  };
  return (
    <Button
      opacity={isDisabled ? 0.5 : 1}
      disabled={isDisabled}
      h='fit'
      variant='unstyled'
      onClick={onClick}
      borderRadius='md'
      borderColor={color}
      borderWidth={1}
      p={3}
      _hover={{ background: isDisabled ? undefined : color }}
      w='100%'
    >
      <HStack justify='space-between'>
        <Text>{poll.name}</Text>
        <HStack>
          {poll.submissions.length > 0 ? (
            <Text color='green.500'>
              <TbCircleCheckFilled />
            </Text>
          ) : (
            <TbCircle />
          )}
          <TbChevronRight />
        </HStack>
      </HStack>
    </Button>
  );
}
