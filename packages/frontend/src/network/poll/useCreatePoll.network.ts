import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { CreatePollDto } from '../../types/dto.types';
import { PollDocument } from '../../types/types';

export function useCreatePoll(onSuccess: (response: PollDocument) => void) {
  return useMutation(
    'createPoll',
    async (body: CreatePollDto) => {
      const response = await axios.post<PollDocument>(ApiPaths.POLL, body);
      return response.data;
    },
    { onSuccess }
  );
}
