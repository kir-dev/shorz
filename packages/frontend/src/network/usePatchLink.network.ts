import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { PatchLinkDto } from '../types/dto.types';
import { LinkDocument } from '../types/types';
import { joinPath } from '../utils/path';
import { useNetwork } from '../utils/useNetwork';

export function usePatchLink(id: string) {
  return useNetwork((body: PatchLinkDto) => {
    return axios.patch<LinkDocument>(joinPath(ApiPaths.LINK, id), body);
  });
}
