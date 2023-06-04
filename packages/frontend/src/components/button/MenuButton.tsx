import { useLocation } from 'react-router-dom';

import { NavButton, NavButtonProps } from './NavButton';

interface MenuButtonProps extends NavButtonProps {
  to: string;
}

export function MenuButton({ to, ...props }: MenuButtonProps) {
  const { pathname } = useLocation();
  return (
    <NavButton
      w='100%'
      h={10}
      justifyContent='flex-start'
      to={to}
      {...props}
      variant={pathname.startsWith(to) ? 'solid' : 'ghost'}
    />
  );
}
