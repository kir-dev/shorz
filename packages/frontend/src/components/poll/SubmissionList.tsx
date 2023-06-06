import { baseTheme, Box, Center, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TbCircle, TbCircleCheckFilled, TbCircleXFilled } from 'react-icons/tb';

import { SubmissionAnswerValue, SubmissionDocument } from '../../types/types';

interface SubmissionListProps {
  submissions: SubmissionDocument[];
  answerOptions: string[];
}

export function SubmissionList({ submissions, answerOptions }: SubmissionListProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return (
    <Box maxW='100%' overflowX='scroll' pb={5}>
      <Table
        css={css`
          border-collapse: separate;
        `}
      >
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
        <Tbody>
          {submissions.map((sub) => (
            <Tr key={sub._id}>
              <Th textAlign='right' h={20} position='sticky' border={0} bg={bgColor} left={0} ml={-1}>
                <Text noOfLines={3}>{sub.name}</Text>
              </Th>
              {answerOptions.map((ao) => (
                <AnswerTableData key={ao} value={sub.answers.find((ans) => ans.key === ao)?.value} />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

interface AnswerTableDataProps {
  value: SubmissionAnswerValue | undefined;
}

function AnswerTableData({ value }: AnswerTableDataProps) {
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
  return (
    <Td fontSize={30} bgColor={color + '20'} color={color}>
      <Center width='100%'>{icon}</Center>
    </Td>
  );
}

function useRawColor(color: keyof typeof baseTheme.colors) {
  return useColorModeValue(baseTheme.colors[color]['500'], baseTheme.colors[color]['200']);
}
