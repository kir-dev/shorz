import { Link, Poll, Submission } from './types';

export type CreateLinkDto = Omit<Link, 'timestamps' | 'shortId'> & { shortId?: Link['shortId'] };
export type PatchLinkDto = Partial<Omit<Link, 'timestamps' | 'shortId'>>;
export type CreatePollDto = Poll;
export type PatchPollDto = Partial<Poll>;
export type CreateSubmissionDto = Omit<Submission, 'poll'>;
export type SetRoleDto = { isAdmin: boolean };
