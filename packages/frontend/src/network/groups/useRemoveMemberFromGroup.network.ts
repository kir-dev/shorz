import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { RemoveMemberFromGroupDto } from '../../types/dto.types';
import { joinPath } from '../../utils/path';

export function useRemoveMemberFromGroup(groupId: string) {
  return useMutation(async (data: RemoveMemberFromGroupDto) => {
    const response = await axios.delete(joinPath(ApiPaths.GROUP, groupId, 'members', data.memberId));
    return response.data;
  });
}
