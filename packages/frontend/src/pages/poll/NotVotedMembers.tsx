import { VStack } from '@chakra-ui/react';
import { TbLoader } from 'react-icons/tb';

import { IconLabel } from '../../components/common/IconLabel';
import { l } from '../../utils/language';

export function NotVotedMembers({ notVoted }: { notVoted: string[] }) {
  return (
    <VStack alignItems='flex-start' gap={0}>
      <IconLabel text={l('page.pollDetails.notVoted')} icon={<TbLoader />} />
      <VStack alignItems='flex-start' gap={1}>
        {notVoted.map((u) => (
          <p key={u}>{u}</p>
        ))}
      </VStack>
    </VStack>
  );
}
