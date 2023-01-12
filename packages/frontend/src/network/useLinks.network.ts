import { useNetworkQuery } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';

export function useLinks() {
  return useNetworkQuery(() => {
    return axios.get<LinkDocument[]>(ApiPaths.LINK);
  });
}
