import { TbLink, TbListDetails } from 'react-icons/tb';

import { CreateLinkPage } from '../pages/CreateLink.page';
import { DashboardPage } from '../pages/Dashboard.page';
import { EditLinkPage } from '../pages/EditLink.page';
import { LinkDetailsPage } from '../pages/LinkDetails.page';
import { LinksPage } from '../pages/Links.page';
import { RouterItem } from '../types/types';
import { l } from '../utils/language';
import { UIPaths } from './paths.config';

export const MenuItems: RouterItem[] = [
  {
    name: l('title.dashboard'),
    path: UIPaths.DASHBOARD,
    page: DashboardPage,
    icon: TbListDetails({}),
  },
  {
    name: l('title.links'),
    path: UIPaths.LINK,
    page: LinksPage,
    icon: TbLink({}),
  },
  {
    path: UIPaths.NEW_LINK,
    page: CreateLinkPage,
  },
  {
    path: UIPaths.LINK_DETAILS,
    page: LinkDetailsPage,
  },
  {
    path: UIPaths.EDIT_LINK,
    page: EditLinkPage,
  },
];
