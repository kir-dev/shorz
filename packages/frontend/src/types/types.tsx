import { ReactElement } from 'react';
import { UIPaths } from '../config/paths.config';

type Document<T> = {
  _id: string;
} & T;

export type UserDocument = Document<User>;
export type LinkDocument = Document<Link>;

export const DummyLink: LinkDocument = {
  _id: '',
  name: '',
  shortId: '',
  url: '',
  timestamps: [],
};

export type User = {
  displayName: string;
  mail: string;
  isAdmin: boolean;
  links: string[];
};

export type Link = {
  name: string;
  shortId: string;
  url: string;
  timestamps: number[];
};

export type RouterItem = MenuPage | RoutePage;

export type MenuPage = {
  name: string;
  icon?: ReactElement;
} & RoutePage;

export type RoutePage = {
  path: UIPaths;
  page: () => JSX.Element;
  admin?: boolean;
};
