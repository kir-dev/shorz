import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../config/paths.config';
import { UserDocument } from '../types/types';

export function useUsersNetwork() {
  return useQuery('users', async () => {
    const response = await axios.get<UserDocument[]>(ApiPaths.USERS);
    return response.data;
  });
}
