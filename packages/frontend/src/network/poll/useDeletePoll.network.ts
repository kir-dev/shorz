import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { joinPath } from '../../utils/path';

export function useDeletePoll(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['deletePoll', id],
    async () => {
      if (!id) return;
      const response = await axios.delete(joinPath(ApiPaths.POLL, id));
      return response.data;
    },
    { onSuccess }
  );
}
