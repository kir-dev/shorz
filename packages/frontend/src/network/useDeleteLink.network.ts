import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { joinPath } from '../utils/path';

export function useDeleteLink(id: string) {
  return useNetwork(() => {
    return axios.delete(joinPath(ApiPaths.LINK, id));
  });
}
