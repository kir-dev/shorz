import { Box, ButtonGroup, HStack, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { TbCircle, TbCircleCheckFilled, TbCircleDotFilled, TbCircleXFilled } from 'react-icons/tb';

import { CreateSubmissionDto } from '../../types/dto.types';
import { PollType, SubmissionAnswer, SubmissionAnswerValue } from '../../types/types';

interface AnswerFieldProps {
  pollType: PollType;
}

export function AnswerField(props: AnswerFieldProps) {
  const { control } = useFormContext<CreateSubmissionDto>();
  return (
    <Controller
      render={({ field }) => <AnswerFieldRender value={field.value} onChange={field.onChange} {...props} />}
      name='answers'
      control={control}
    />
  );
}

interface AnswerFieldRenderProps {
  pollType: PollType;
  value: SubmissionAnswer[];
  onChange: (value: SubmissionAnswer[]) => void;
}

function AnswerFieldRender({ pollType, onChange, value = [] }: AnswerFieldRenderProps) {
  const handleSingleSelectItemChange = (index: number, newValue: SubmissionAnswerValue) => {
    const updatedValue = value.map((v) => ({ ...v, value: SubmissionAnswerValue.NO }));
    updatedValue[index].value = newValue;
    onChange(updatedValue);
  };

  const handleMultiSelectItemChange = (index: number, newValue: SubmissionAnswerValue) => {
    const updatedValue = [...value];
    updatedValue[index].value = newValue;
    onChange(updatedValue);
  };
  return (
    <Box>
      {value.map((v, index) => {
        if (pollType === PollType.SINGLE) {
          return (
            <SingleSelectAnswerItem
              key={index}
              label={v.key}
              value={v.value}
              onClick={(newV) => handleSingleSelectItemChange(index, newV)}
            />
          );
        }
        return (
          <MultiSelectAnswerItem
            key={index}
            label={v.key}
            value={v.value}
            isMaybePossible={pollType === PollType.MULTI_WITH_MAYBE}
            onClick={(newV) => handleMultiSelectItemChange(index, newV)}
          />
        );
      })}
    </Box>
  );
}

interface SingleSelectAnswerItemProps {
  label: string;
  onClick: (newValue: SubmissionAnswerValue) => void;
  value: SubmissionAnswerValue;
}

function SingleSelectAnswerItem({ label, onClick, value }: SingleSelectAnswerItemProps) {
  const brandBorderColor = useColorModeValue('brand.500', 'brand.300');
  const grayBorderColor = useColorModeValue('gray.500', 'gray.600');
  return (
    <HStack
      w='full'
      p={3}
      mb={1}
      borderRadius='lg'
      borderWidth={1}
      borderColor={value === SubmissionAnswerValue.YES ? brandBorderColor : grayBorderColor}
      justifyContent='space-between'
      cursor='pointer'
      onClick={() => onClick(SubmissionAnswerValue.YES)}
    >
      <Text>{label}</Text>
      <ButtonGroup>
        <OptionDot isOnlyOption currentValue={value} option={SubmissionAnswerValue.YES} onClick={onClick} />
      </ButtonGroup>
    </HStack>
  );
}

interface MultiSelectAnswerItemProps {
  label: string;
  onClick: (newValue: SubmissionAnswerValue) => void;
  value: SubmissionAnswerValue;
  isMaybePossible?: boolean;
}

function MultiSelectAnswerItem({ label, onClick, isMaybePossible, value }: MultiSelectAnswerItemProps) {
  return (
    <HStack w='full' py={3} borderBottomWidth={1} borderBottomColor='gray.500' justifyContent='space-between'>
      <Text>{label}</Text>
      <ButtonGroup>
        <OptionDot currentValue={value} option={SubmissionAnswerValue.NO} onClick={onClick} />
        {isMaybePossible && <OptionDot currentValue={value} option={SubmissionAnswerValue.MAYBE} onClick={onClick} />}
        <OptionDot currentValue={value} option={SubmissionAnswerValue.YES} onClick={onClick} />
      </ButtonGroup>
    </HStack>
  );
}

interface OptionDotProps {
  currentValue: SubmissionAnswerValue;
  option: SubmissionAnswerValue;
  isOnlyOption?: boolean;
  onClick: (value: SubmissionAnswerValue) => void;
}

function OptionDot({ currentValue, option, onClick, isOnlyOption }: OptionDotProps) {
  let color = 'brand';
  let icon = <TbCircleDotFilled />;
  if (!isOnlyOption) {
    switch (option) {
      case SubmissionAnswerValue.NO:
        color = 'red';
        icon = <TbCircleXFilled />;
        break;
      case SubmissionAnswerValue.MAYBE:
        color = 'yellow';
        icon = <AiFillQuestionCircle />;
        break;
      case SubmissionAnswerValue.YES:
        color = 'green';
        icon = <TbCircleCheckFilled />;
    }
  }

  return (
    <IconButton onClick={() => onClick(option)} aria-label='option' variant='ghost' colorScheme={color} fontSize='xl'>
      {currentValue === option ? icon : <TbCircle />}
    </IconButton>
  );
}
