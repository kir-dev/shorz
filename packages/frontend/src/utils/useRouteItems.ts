import { useMemo } from 'react';

import { MenuItems } from '../config/menu.config';
import { useAuthContext } from '../context/auth.context';

export function useRouteItems() {
  const { user } = useAuthContext();
  return useMemo(() => {
    return MenuItems.filter((mi) => (mi.admin ? !!user?.isAdmin : true));
  }, [user?.isAdmin]);
}
