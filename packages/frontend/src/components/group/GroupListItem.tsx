import { HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { UIPaths } from '../../config/paths.config';
import { GroupDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

interface GroupListItemProps {
  group: GroupDocument;
}
export function GroupListItem({ group }: GroupListItemProps) {
  const color = useColorModeValue('gray.100', 'gray.600');
  const navigate = useNavigate();
  const onClick = () => navigate(joinPath(UIPaths.GROUP, group._id));
  return (
    <HStack
      p={3}
      cursor='pointer'
      justify='space-between'
      borderRadius='md'
      borderColor={color}
      borderWidth={1}
      w='100%'
      _hover={{ background: color }}
      onClick={onClick}
    >
      <Text>{group.name}</Text>
      <TbChevronRight />
    </HStack>
  );
}
