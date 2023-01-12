import { Text, VStack } from '@chakra-ui/react';
import { l } from '../utils/language';
import { HiArrowDown } from 'react-icons/hi2';

interface EmptyListPlaceholderProps {
  text?: string;
  hideArrow?: boolean;
}
export function EmptyListPlaceholder({ text, hideArrow = false }: EmptyListPlaceholderProps) {
  return (
    <VStack w='100%' align='flex-start'>
      <Text opacity={0.5}>{text || l('text.emptyList')}</Text>
      {!hideArrow && <HiArrowDown size={40} opacity={0.5} />}
    </VStack>
  );
}
