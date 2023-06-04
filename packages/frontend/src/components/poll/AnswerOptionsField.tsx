import { Button, HStack, IconButton, Input, VStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { TbArrowDown, TbArrowUp, TbCopy, TbPlus, TbX } from 'react-icons/tb';

import { CreatePollDto } from '../../types/dto.types';
import { l } from '../../utils/language';

export function AnswerOptionsField() {
  const { control } = useFormContext<CreatePollDto>();
  return (
    <Controller
      name='answerOptions'
      control={control}
      render={({ field }) => <StringList value={field.value} onChange={field.onChange} />}
    />
  );
}

interface StringListProps {
  value: string[];
  onChange: (value: string[]) => void;
}

function StringList({ value = [], onChange }: StringListProps) {
  const handleAddItem = () => {
    onChange([...value, '']);
  };

  const handleDeleteItem = (index: number) => {
    const updatedValue = [...value];
    updatedValue.splice(index, 1);
    onChange(updatedValue);
  };

  const handleDuplicateItem = (index: number) => {
    const updatedValue = [...value];
    updatedValue.splice(index, 0, updatedValue[index]);
    onChange(updatedValue);
  };

  const moveItemBack = (index: number) => {
    const updatedValue = [...value];
    const item = updatedValue.splice(index, 1)[0];
    if (index === 0) {
      updatedValue.push(item);
    } else {
      updatedValue.splice(index - 1, 0, item);
    }
    onChange(updatedValue);
  };

  const moveItemForward = (index: number) => {
    const updatedValue = [...value];
    const item = updatedValue.splice(index, 1)[0];
    if (index === updatedValue.length) {
      updatedValue.splice(0, 0, item);
    } else {
      updatedValue.splice(index + 1, 0, item);
    }
    onChange(updatedValue);
  };

  return (
    <VStack w='100%' spacing={3}>
      {value.map((item, index) => (
        <HStack justifyContent='space-between' w='100%' key={index}>
          <Input
            type='text'
            value={item}
            onChange={(e) => {
              const updatedValue = [...value];
              updatedValue[index] = e.target.value;
              onChange(updatedValue);
            }}
          />
          <IconButton aria-label={l('button.duplicate')} variant='ghost' onClick={() => moveItemBack(index)}>
            <TbArrowUp />
          </IconButton>
          <IconButton aria-label={l('button.duplicate')} variant='ghost' onClick={() => moveItemForward(index)}>
            <TbArrowDown />
          </IconButton>
          <IconButton aria-label={l('button.duplicate')} variant='ghost' onClick={() => handleDuplicateItem(index)}>
            <TbCopy />
          </IconButton>
          <IconButton
            aria-label={l('button.delete')}
            variant='ghost'
            colorScheme='red'
            onClick={() => handleDeleteItem(index)}
          >
            <TbX />
          </IconButton>
        </HStack>
      ))}
      <Button onClick={handleAddItem} variant='ghost' leftIcon={<TbPlus />}>
        {l('button.add')}
      </Button>
    </VStack>
  );
}
