import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';
import { useNetworkQuery } from '../utils/useNetwork';

export function useLinks() {
  return useNetworkQuery(() => {
    return axios.get<LinkDocument[]>(ApiPaths.LINK);
  });
}
