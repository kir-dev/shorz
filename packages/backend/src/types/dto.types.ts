import { Link } from '../schemas/link.schema';

export type CreateLinkDto = Omit<Link, 'timestamps' | 'shortId'> & { shortId?: Link['shortId'] };
export type PatchLinkDto = Partial<Omit<Link, 'timestamps' | 'shortId'>>;
export type SetAdminDto = { isAdmin: boolean };
