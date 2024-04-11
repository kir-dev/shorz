import { Box, Text, VStack } from '@chakra-ui/react';
import { TbAward } from 'react-icons/tb';

import { ConfidentialPollResult, SubmissionAnswerValue } from '../../types/types';
import { l } from '../../utils/language';
import { IconLabel } from '../common/IconLabel';

type Props = {
  results: ConfidentialPollResult[];
};

export function ConfidentialVoteResult({ results }: Props) {
  return (
    <Box>
      <IconLabel text={l('page.pollDetails.results')} icon={<TbAward />} />
      <VStack gap={1} alignItems='flex-start'>
        {results.map((result) => (
          <Text key={result.key}>
            <span style={{ textTransform: 'uppercase' }}>{result.key}</span>: {result[SubmissionAnswerValue.YES]}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
