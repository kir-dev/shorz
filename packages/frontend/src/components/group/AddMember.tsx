import { Button, HStack, Input, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAddMemberToGroup } from '../../network/groups/useAddMemberToGroup.network';
import { AddMemberToGroupDto } from '../../types/dto.types';
import { l } from '../../utils/language';
import { addMemberValidation } from '../../utils/validation';

interface AddMemberProps {
  groupId: string;
  onAddMember: () => void;
}

export function AddMember({ groupId, onAddMember }: AddMemberProps) {
  const addMember = useAddMemberToGroup(groupId);

  const { register, handleSubmit } = useForm<AddMemberToGroupDto>({
    resolver: yupResolver(addMemberValidation),
  });

  const onSubmit = handleSubmit((data) => {
    addMember.mutateAsync(data).then(() => {
      onAddMember();
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Text mt={10}>{l('page.groups.addMember')}</Text>
      <HStack mt={2}>
        <Input w='md' {...register('memberMail')} />
        <Button isLoading={addMember.isLoading} type='submit'>
          {l('button.add')}
        </Button>
      </HStack>
      {addMember.isError && <Text color='red.500'>{l('error.addMember')}</Text>}
    </form>
  );
}
