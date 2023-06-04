import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { CreateSubmissionDto } from '../../types/dto.types';
import { Submission } from '../../types/types';
import { joinPath } from '../../utils/path';

export function useCreateSubmission(id: string | undefined, onSuccess: () => void) {
  return useMutation(
    ['createSubmission', id],
    async (body: CreateSubmissionDto) => {
      if (!id) return;
      const response = await axios.post<Submission>(joinPath(ApiPaths.SUBMISSION, id), body);
      return response.data;
    },
    { onSuccess }
  );
}
