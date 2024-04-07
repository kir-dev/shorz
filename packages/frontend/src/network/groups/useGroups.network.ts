import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { GroupDocument } from '../../types/types';

export function useGroups(withAdmin = false) {
  return useQuery('groups', async () => {
    const path = withAdmin ? `${ApiPaths.GROUP}?with-admin=true` : ApiPaths.GROUP;
    const response = await axios.get<GroupDocument[]>(path);
    return response.data;
  });
}
