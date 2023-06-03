import { Heading, HStack } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { DrawerMenu } from './DrawerMenu';

interface TitleBarProps {
  drawerEnabled?: boolean;
}

export function TitleBar({ drawerEnabled }: TitleBarProps) {
  return (
    <HStack justifyContent='space-between' py={5}>
      <Heading>Shorz</Heading>
      <HStack>
        <ColorModeSwitcher />
        {drawerEnabled && <DrawerMenu />}
      </HStack>
    </HStack>
  );
}
