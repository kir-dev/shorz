import axios from 'axios';
import { useQuery } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { LinkDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

export function useLinkByUrl(url: string | undefined) {
  return useQuery(
    ['link', url],
    async () => {
      if (!url) return;
      const response = await axios.get<LinkDocument>(joinPath(ApiPaths.LINK_BY_URL, encodeURIComponent(url)));
      return response.data;
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
}
