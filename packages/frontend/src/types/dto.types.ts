import { Group, Link, Poll, Submission } from './types';

export type CreateLinkDto = Omit<Link, 'timestamps' | 'shortId'> & { shortId?: Link['shortId'] };
export type PatchLinkDto = Partial<Omit<Link, 'timestamps' | 'shortId'>>;
export type CreatePollDto = Poll;
export type PatchPollDto = Partial<Poll>;
export type CreateSubmissionDto = Omit<Submission, 'poll'>;
export type SetRoleDto = { isAdmin: boolean };
export type CreateGroupDto = Omit<Group, 'memberIds' | 'admin'>;
export type PatchGroupDto = Partial<Omit<Group, 'memberIds' | 'admin'>>;
export type AddMemberToGroupDto = { memberMail: string };
export type RemoveMemberFromGroupDto = { memberId: string };
