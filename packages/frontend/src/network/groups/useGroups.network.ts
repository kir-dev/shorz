import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { GroupDocument } from '../../types/types';

export function useGroups() {
  return useQuery('groups', async () => {
    const response = await axios.get<GroupDocument[]>(ApiPaths.GROUP);
    return response.data;
  });
}
