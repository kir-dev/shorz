import { useMemo } from 'react';

import { MenuItems } from '../config/menu.config';
import { useAuthContext } from '../context/auth.context';
import { MenuPage } from '../types/types';

export function useMenuItems() {
  const { user } = useAuthContext();
  return useMemo(() => {
    return (MenuItems.filter((mi) => 'name' in mi) as MenuPage[]).filter((mi) => !(mi.admin && !user?.isAdmin));
  }, [user?.isAdmin]);
}
