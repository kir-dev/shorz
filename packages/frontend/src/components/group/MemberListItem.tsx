import { Button, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { TbCircleMinus } from 'react-icons/tb';

import { useRemoveMemberFromGroup } from '../../network/groups/useRemoveMemberFromGroup.network';
import { UserDocument } from '../../types/types';

interface MemberListItemProps {
  removeEnabled?: boolean;
  groupId: string;
  member: UserDocument;
  onDelete?: () => void;
}

export function MemberListItem({ member, onDelete, groupId, removeEnabled }: MemberListItemProps) {
  const removeMemberFromGroup = useRemoveMemberFromGroup(groupId);
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const onRemove = async () => {
    removeMemberFromGroup.mutateAsync({ memberId: member._id }).then(() => {
      onDelete && onDelete();
    });
  };
  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <Text isTruncated>{member.displayName}</Text>
      {removeEnabled && onDelete && (
        <Button
          isLoading={removeMemberFromGroup.isLoading}
          onClick={onRemove}
          colorScheme='red'
          variant='ghost'
          size='sm'
        >
          <TbCircleMinus />
        </Button>
      )}
    </HStack>
  );
}
