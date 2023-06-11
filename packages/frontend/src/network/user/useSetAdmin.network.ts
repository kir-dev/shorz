import axios from 'axios';
import { useMutation } from 'react-query';

import { ApiPaths } from '../../config/paths.config';
import { SetRoleDto } from '../../types/dto.types';

export function useSetAdminNetwork(id: string, onSuccess?: () => void, onError?: () => void) {
  return useMutation(
    ['role', id],
    async (body: SetRoleDto) => {
      await axios.patch(ApiPaths.SET_ROLE + '/' + id, body);
    },
    { onError, onSuccess }
  );
}
