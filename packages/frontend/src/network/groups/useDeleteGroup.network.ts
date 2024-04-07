import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { joinPath } from '../../utils/path';

export function useDeleteGroup(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['deleteGroup', id],
    async () => {
      if (!id) return;
      const response = await axios.delete(joinPath(ApiPaths.GROUP, id));
      return response.data;
    },
    { onSuccess }
  );
}
