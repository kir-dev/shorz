import { ReactElement } from 'react';

import { UIPaths } from '../config/paths.config';

type Document<T> = {
  _id: string;
} & T;

export type UserDocument = Document<User>;
export type LinkDocument = Document<Link>;
export type PollDocument = Document<Poll>;
export type SubmissionDocument = Document<Submission>;
export type PollDocumentWithSubmissions = Document<PollWithSubmissions>;

export enum PollType {
  SINGLE,
  MULTI,
  MULTI_WITH_MAYBE,
}

export type Poll = {
  name: string;
  enabled: boolean;
  confidential: boolean;
  question: string;
  type: PollType;
  answerOptions: string[];
};

export type ConfidentialPollResult = {
  key: string;
} & { [K in SubmissionAnswerValue]: number };

export type PollWithSubmissions = Poll & { submissions?: SubmissionDocument[]; results?: ConfidentialPollResult[] };

export enum SubmissionAnswerValue {
  NO,
  MAYBE,
  YES,
}

export type SubmissionAnswer = { key: string; value: SubmissionAnswerValue };

export type Submission = {
  name: string;
  poll: string;
  answers: SubmissionAnswer[];
};

export type User = {
  authId: string;
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
