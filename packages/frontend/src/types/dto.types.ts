import { Link, LinkDocument } from './types';

export type CreateLinkDto = Omit<Link, 'timestamps' | 'shortId'>;
export type PatchLinkDto = Partial<Omit<LinkDocument, 'timestamps' | 'shortId' | '_id'>>;
export type SetRoleDto = { isAdmin: boolean };
