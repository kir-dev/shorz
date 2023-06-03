import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../config/paths.config';
import { PatchLinkDto } from '../types/dto.types';
import { LinkDocument } from '../types/types';
import { joinPath } from '../utils/path';

export function usePatchLink(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['patchLink', id],
    async (body: PatchLinkDto) => {
      if (!id) return;
      const response = await axios.patch<LinkDocument>(joinPath(ApiPaths.LINK, id), body);
      return response.data;
    },
    { onSuccess }
  );
}
