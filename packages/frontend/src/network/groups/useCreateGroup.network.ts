import axios from 'axios';
import { useMutation } from 'react-query';

import { CreateGroupDto } from '../../types/dto.types';
import { GroupDocument } from '../../types/types';

export function useCreateGroup(onSuccess?: (data: GroupDocument) => void) {
  return useMutation(
    async (data: CreateGroupDto) => {
      const response = await axios.post<GroupDocument>('/admin/groups', data);
      return response.data;
    },
    {
      onSuccess,
    }
  );
}
