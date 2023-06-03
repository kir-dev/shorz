import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../config/paths.config';
import { joinPath } from '../utils/path';

export function useDeleteLink(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['deleteLink', id],
    async () => {
      if (!id) return;
      const response = await axios.delete(joinPath(ApiPaths.LINK, id));
      return response.data;
    },
    { onSuccess }
  );
}
