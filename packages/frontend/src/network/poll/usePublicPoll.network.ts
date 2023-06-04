import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { PollDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

export function usePublicPoll(id: string | undefined) {
  return useQuery(['polls', 'public', id], async () => {
    if (!id) return;
    const response = await axios.get<PollDocument>(joinPath(ApiPaths.PUBLIC_POLL, id));
    return response.data;
  });
}
