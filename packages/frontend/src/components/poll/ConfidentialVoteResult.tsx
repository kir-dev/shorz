import { Box, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { TbAward } from 'react-icons/tb';

import { ConfidentialPollResult, SubmissionAnswerValue } from '../../types/types';
import { l } from '../../utils/language';
import { IconLabel } from '../common/IconLabel';

type Props = {
  results: ConfidentialPollResult[];
};

export function ConfidentialVoteResult({ results }: Props) {
  const sorted = useMemo(() => {
    return results.sort((r1, r2) => -r1[SubmissionAnswerValue.YES] - r2[SubmissionAnswerValue.YES]);
  }, [results]);
  return (
    <Box>
      <IconLabel text={l('page.pollDetails.results')} icon={<TbAward />} />
      <VStack gap={1} alignItems='flex-start'>
        {sorted.map((result, idx) => (
          <Text key={result.key} fontWeight={idx === 0 ? 'bold' : 'normal'}>
            <span style={{ textTransform: 'uppercase' }}>{result.key}</span>: {result[SubmissionAnswerValue.YES]}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
