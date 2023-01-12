import { useNetwork } from '../utils/useNetwork';
import axios from 'axios';
import { ApiPaths } from '../config/paths.config';
import { LinkDocument } from '../types/types';
import { CreateLinkDto } from '../types/dto.types';

export function useCreateLink() {
  return useNetwork((body: CreateLinkDto) => {
    return axios.post<LinkDocument>(ApiPaths.LINK, body);
  });
}
