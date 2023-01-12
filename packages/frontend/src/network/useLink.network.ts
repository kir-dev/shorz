import { useNetworkQuery } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';
import { joinPath } from '../utils/path';

export function useLink(id: string) {
  return useNetworkQuery(() => {
    return axios.get<LinkDocument>(joinPath(ApiPaths.LINK, id));
  });
}
