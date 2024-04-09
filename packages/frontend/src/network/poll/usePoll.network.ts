import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { PollDocumentWithSubmissions } from '../../types/types';
import { joinPath } from '../../utils/path';

export function usePoll(id: string | undefined) {
  return useQuery(
    ['polls', id],
    async () => {
      if (!id) return;
      const response = await axios.get<PollDocumentWithSubmissions>(joinPath(ApiPaths.POLL, id));
      return response.data;
    },
    { refetchInterval: 10000 }
  );
}
