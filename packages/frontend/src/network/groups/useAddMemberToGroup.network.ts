import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { AddMemberToGroupDto } from '../../types/dto.types';
import { joinPath } from '../../utils/path';

export function useAddMemberToGroup(groupId: string) {
  return useMutation(async (data: AddMemberToGroupDto) => {
    const response = await axios.post(joinPath(ApiPaths.GROUP, groupId, 'members'), data);
    return response.data;
  });
}
