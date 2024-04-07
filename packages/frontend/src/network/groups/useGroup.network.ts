import axios from 'axios';
import { useQuery } from 'react-query';

import { GroupDocument } from '../../types/types';

export function useGroup(id: string) {
  return useQuery(['group', id], async () => {
    const response = await axios.get<GroupDocument>(`/admin/groups/${id}`);
    return response.data;
  });
}
