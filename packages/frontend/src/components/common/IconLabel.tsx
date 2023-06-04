import { HStack, Text } from '@chakra-ui/react';

interface IconLabelProps {
  text: string;
  icon: JSX.Element;
}
export function IconLabel({ icon, text }: IconLabelProps) {
  return (
    <HStack color='gray.500' mb={0}>
      {icon}
      <Text>{text}</Text>
    </HStack>
  );
}
