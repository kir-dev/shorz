import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { CreateLinkDto } from '../../types/dto.types';
import { LinkDocument } from '../../types/types';

export function useCreateLink(onSuccess?: (response: LinkDocument) => void) {
  return useMutation(
    'createLink',
    async (body: CreateLinkDto) => {
      const response = await axios.post<LinkDocument>(ApiPaths.LINK, body);
      return response.data;
    },
    { onSuccess }
  );
}
