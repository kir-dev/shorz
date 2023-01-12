import { RouterItem } from '../types/types';
import { UIPaths } from './paths.config';
import { TbLink, TbListDetails } from 'react-icons/tb';
import { DashboardPage } from '../pages/Dashboard.page';
import { l } from '../utils/language';
import { LinksPage } from '../pages/Links.page';
import { CreateLinkPage } from '../pages/CreateLink.page';
import { LinkDetailsPage } from '../pages/LinkDetails.page';
import { EditLinkPage } from '../pages/EditLink.page';

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
