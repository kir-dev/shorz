import { FormControl, FormLabel, HStack, Switch, Text, useColorModeValue } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useQueryClient } from 'react-query';

import { useAuthContext } from '../../context/auth.context';
import { useSetAdminNetwork } from '../../network/user/useSetAdmin.network';
import { UserDocument } from '../../types/types';

interface UserListItemProps {
  user: UserDocument;
}

export function UserListItem({ user }: UserListItemProps) {
  const queryClient = useQueryClient();
  const { mutate } = useSetAdminNetwork(user._id, async () => {
    await queryClient.invalidateQueries('users');
  });
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const { user: myUser } = useAuthContext();
  const onChangeRole = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    mutate({ isAdmin: e.target.checked });
  };
  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <Text isTruncated>{user.displayName}</Text>
      <FormControl w='fit-content'>
        <HStack alignItems='center'>
          <FormLabel m={0}>Admin</FormLabel>
          <Switch defaultChecked={user.isAdmin} disabled={myUser?.mail === user.mail} onChange={onChangeRole} />
        </HStack>
      </FormControl>
    </HStack>
  );
}
