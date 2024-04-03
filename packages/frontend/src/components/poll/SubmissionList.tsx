import {
  baseTheme,
  Box,
  Center,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TbAward, TbCircle, TbCircleCheckFilled, TbCircleXFilled } from 'react-icons/tb';

import { ConfidentialPollResult, SubmissionAnswerValue, SubmissionDocument } from '../../types/types';
import { l } from '../../utils/language';
import { IconLabel } from '../common/IconLabel';

interface SubmissionListProps {
  submissions: SubmissionDocument[];
  answerOptions: string[];
}

export function SubmissionList({ submissions, answerOptions }: SubmissionListProps) {
  const bestOptions = useMemo(() => {
    const yesCounts = answerOptions.reduce<Record<string, number>>((counts, option) => {
      counts[option] = submissions.filter(({ answers }) =>
        answers.some((answer) => answer.key === option && answer.value === SubmissionAnswerValue.YES)
      ).length;
      return counts;
    }, {});
    const maxYesCount = Math.max(...Object.values(yesCounts));
    return Object.keys(yesCounts).filter((option) => yesCounts[option] === maxYesCount);
  }, [submissions, answerOptions]);
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <>
      <Box maxW='100%' overflowX='scroll' pb={5}>
        <Table>
          <SubmissionListHeader answerOptions={answerOptions} />
          <Tbody>
            {submissions.map((sub) => (
              <Tr key={sub._id} border={0}>
                <Th textAlign='right' h={20} position='sticky' bg={bgColor} border={0} left={0}>
                  <Tooltip label={sub.name}>
                    <Text noOfLines={3}>{sub.name}</Text>
                  </Tooltip>
                </Th>
                {answerOptions.map((ao) => (
                  <AnswerTableData key={ao} value={sub.answers.find((ans) => ans.key === ao)?.value} />
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <IconLabel text={l('page.pollDetails.mostVote')} icon={<TbAward />} />
        {bestOptions.map((bo, i) => (
          <Text key={i}>{bo}</Text>
        ))}
      </Box>
    </>
  );
}

interface ConfidentialSubmissionListProps {
  results: ConfidentialPollResult[];
  answerOptions: string[];
}

export function ConfidentialSubmissionList({ results, answerOptions }: ConfidentialSubmissionListProps) {
  const bestOptions = useMemo(() => {
    const maxCount = Math.max(...results.map((r) => r[SubmissionAnswerValue.YES]));
    return results.filter((r) => r[SubmissionAnswerValue.YES] === maxCount).map((r) => r.key);
  }, [results, answerOptions]);
  return (
    <>
      <Box maxW='100%' overflowX='scroll' pb={5}>
        <Table>
          <SubmissionListHeader answerOptions={answerOptions} />
          <Tbody>
            {[SubmissionAnswerValue.YES, SubmissionAnswerValue.NO, SubmissionAnswerValue.MAYBE].map((sav) => (
              <Tr key={sav} border={0}>
                <AnswerTableData value={sav} noWrapper />
                {answerOptions.map((ao) => (
                  <Td textAlign='center' key={ao}>
                    {results.find((r) => r.key === ao)?.[sav]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <IconLabel text={l('page.pollDetails.mostVote')} icon={<TbAward />} />
        {bestOptions.map((bo, i) => (
          <Text key={i}>{bo}</Text>
        ))}
      </Box>
    </>
  );
}

interface AnswerTableDataProps {
  value: SubmissionAnswerValue | undefined;
  noWrapper?: boolean;
}

function AnswerTableData({ value, noWrapper = false }: AnswerTableDataProps) {
  let color = useRawColor('gray');
  const red = useRawColor('red');
  const yellow = useRawColor('yellow');
  const green = useRawColor('green');
  let icon = <TbCircle />;
  if (value !== undefined) {
    switch (value) {
      case SubmissionAnswerValue.NO:
        color = red;
        icon = <TbCircleXFilled />;
        break;
      case SubmissionAnswerValue.MAYBE:
        color = yellow;
        icon = <AiFillQuestionCircle />;
        break;
      case SubmissionAnswerValue.YES:
        color = green;
        icon = <TbCircleCheckFilled />;
    }
  }
  return noWrapper ? (
    <Th
      textAlign='right'
      h={20}
      position='sticky'
      left={0}
      fontSize={30}
      bgColor={color + '20'}
      color={color}
      border={0}
    >
      <Center width='100%'>{icon}</Center>
    </Th>
  ) : (
    <Td fontSize={30} bgColor={color + '20'} color={color} border={0}>
      <Center width='100%'>{icon}</Center>
    </Td>
  );
}

function useRawColor(color: keyof typeof baseTheme.colors) {
  return useColorModeValue(baseTheme.colors[color]['500'], baseTheme.colors[color]['200']);
}

interface SubmissionListHeaderProps {
  answerOptions: string[];
}

function SubmissionListHeader({ answerOptions }: SubmissionListHeaderProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Thead>
      <Tr bg={bgColor}>
        <Th w={20} position='sticky' bg={bgColor} border={0} left={-1} />
        {answerOptions.map((ao, index) => (
          <Th key={index} maxW={200} overflow='hidden' verticalAlign='bottom'>
            <Text noOfLines={3}>{ao}</Text>
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}
