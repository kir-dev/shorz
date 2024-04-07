import { TbCheckupList, TbLink, TbListDetails, TbUser, TbUsers } from 'react-icons/tb';

import { CreateGroupPage } from '../pages/group/CreateGroup.page';
import { EditGroupPage } from '../pages/group/EditGroup.page';
import { GroupDetailsPage } from '../pages/group/GroupDetails.page';
import { GroupsPage } from '../pages/group/Groups.page';
import { CreateLinkPage } from '../pages/link/CreateLink.page';
import { EditLinkPage } from '../pages/link/EditLink.page';
import { LinkDetailsPage } from '../pages/link/LinkDetails.page';
import { LinksPage } from '../pages/link/Links.page';
import { DashboardPage } from '../pages/other/Dashboard.page';
import { CreatePollPage } from '../pages/poll/CreatePoll.page';
import { EditPollPage } from '../pages/poll/EditPoll.page';
import { PollDetailsPage } from '../pages/poll/PollDetails.page';
import { PollsPage } from '../pages/poll/Polls.page';
import { UsersPage } from '../pages/user/Users.page';
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
  {
    name: l('title.polls'),
    path: UIPaths.POLL,
    page: PollsPage,
    icon: TbCheckupList({}),
  },
  { path: UIPaths.NEW_POLL, page: CreatePollPage },
  { path: UIPaths.POLL_DETAILS, page: PollDetailsPage },
  { path: UIPaths.EDIT_POLL, page: EditPollPage },
  {
    name: l('title.users'),
    icon: TbUser({}),
    path: UIPaths.USERS,
    page: UsersPage,
    admin: true,
  },
  {
    name: l('title.groups'),
    icon: TbUsers({}),
    path: UIPaths.GROUP,
    page: GroupsPage,
  },
  {
    path: UIPaths.NEW_GROUP,
    page: CreateGroupPage,
  },
  {
    path: UIPaths.GROUP_DETAILS,
    page: GroupDetailsPage,
  },
  {
    path: UIPaths.EDIT_GROUP,
    page: EditGroupPage,
  },
];
