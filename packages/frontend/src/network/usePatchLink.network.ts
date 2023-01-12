import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';
import { PatchLinkDto } from '../types/dto.types';
import { joinPath } from '../utils/path';

export function usePatchLink(id: string) {
  return useNetwork((body: PatchLinkDto) => {
    return axios.patch<LinkDocument>(joinPath(ApiPaths.LINK, id), body);
  });
}
