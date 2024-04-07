import axios from 'axios';
import { useQuery } from 'react-query';

import { GroupDetails } from '../../types/types';

export function useGroup(id: string) {
  return useQuery(['group', id], async () => {
    const response = await axios.get<GroupDetails>(`/admin/groups/${id}`);
    return response.data;
  });
}
