import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';

export function useLinks() {
  return useQuery('links', async () => {
    const response = await axios.get<LinkDocument[]>(ApiPaths.LINK);
    return response.data;
  });
}
