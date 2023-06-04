import { PollType } from '../types/types';

export const PollTypeOptions: Record<PollType, { label: string; value: number }> = {
  [PollType.SINGLE]: { label: 'Egy lehetőség', value: PollType.SINGLE },
  [PollType.MULTI]: { label: 'Több lehetőség', value: PollType.MULTI },
  [PollType.MULTI_WITH_MAYBE]: { label: 'Nem/Talán/Igen', value: PollType.MULTI_WITH_MAYBE },
};
