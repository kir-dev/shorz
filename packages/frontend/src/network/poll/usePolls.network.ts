import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { PollDocument } from '../../types/types';

export function usePolls() {
  return useQuery('polls', async () => {
    const response = await axios.get<PollDocument[]>(ApiPaths.POLL);
    return response.data;
  });
}
