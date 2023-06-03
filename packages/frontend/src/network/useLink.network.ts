import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';
import { joinPath } from '../utils/path';

export function useLink(id: string | undefined) {
  return useQuery(['link', id], async () => {
    if (!id) return;
    const response = await axios.get<LinkDocument>(joinPath(ApiPaths.LINK, id));
    return response.data;
  });
}
