import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { PatchPollDto } from '../../types/dto.types';
import { PollDocument } from '../../types/types';
import { joinPath } from '../../utils/path';

export function usePatchPoll(id: string | undefined, onSuccess?: () => void) {
  return useMutation(
    ['editPoll', id],
    async (body: PatchPollDto) => {
      if (!id) return;
      const response = await axios.patch<PollDocument>(joinPath(ApiPaths.POLL, id), body);
      return response.data;
    },
    { onSuccess }
  );
}
