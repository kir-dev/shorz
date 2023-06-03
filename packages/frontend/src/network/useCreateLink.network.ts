import axios from 'axios';

import { ApiPaths } from '../config/paths.config';
import { CreateLinkDto } from '../types/dto.types';
import { LinkDocument } from '../types/types';
import { useNetwork } from '../utils/useNetwork';

export function useCreateLink() {
  return useNetwork((body: CreateLinkDto) => {
    return axios.post<LinkDocument>(ApiPaths.LINK, body);
  });
}
