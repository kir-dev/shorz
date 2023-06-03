import { Button, Menu, MenuButton as MenuDropdownButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { TbChevronDown, TbUser } from 'react-icons/tb';

import { useAuthContext } from '../context/auth.context';
import { l } from '../utils/language';
import { useMenuItems } from '../utils/useMenuItems';
import { MenuButton } from './MenuButton';

export function NavBar() {
  const { user, logout } = useAuthContext();
  const menuItems = useMenuItems();
  return (
    <>
      <MenuSection>{l('navbar.section.user')}</MenuSection>
      <Menu>
        <MenuDropdownButton isTruncated leftIcon={<TbUser />} as={Button} rightIcon={<TbChevronDown />} variant='ghost'>
          {user?.displayName || l('navbar.unknown')}
        </MenuDropdownButton>
        <MenuList>
          <MenuItem onClick={logout}>{l('navbar.logout')}</MenuItem>
        </MenuList>
      </Menu>
      <MenuSection>{l('navbar.section.things')}</MenuSection>
      {menuItems?.map((mi) => (
        <MenuButton leftIcon={mi.icon} key={mi.path} to={mi.path}>
          {mi.name}
        </MenuButton>
      ))}
    </>
  );
}

function MenuSection({ children }: PropsWithChildren) {
  return (
    <Text size='xs' color='gray.500'>
      {children}
    </Text>
  );
}
