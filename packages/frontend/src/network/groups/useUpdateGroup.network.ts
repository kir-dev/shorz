import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { PatchGroupDto } from '../../types/dto.types';
import { GroupDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

export function useUpdateGroup(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['updateGroup', id],
    async (body: PatchGroupDto) => {
      if (!id) return;
      const response = await axios.patch<GroupDocument>(joinPath(ApiPaths.GROUP, id), body);
      return response.data;
    },
    { onSuccess }
  );
}
