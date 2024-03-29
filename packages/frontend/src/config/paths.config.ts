export enum UIPaths {
  ROOT = '/',
  LOGIN = '/login',
  FILL_POLL = '/p/:id',
  FILL_SUCCESS = '/p/success',
  LINK = '/link',
  LINK_DETAILS = '/link/:id',
  EDIT_LINK = '/link/:id/edit',
  USERS = '/users',
  NEW_LINK = '/link/new',
  POLL = '/poll',
  POLL_DETAILS = '/poll/:id',
  NEW_POLL = '/poll/new',
  EDIT_POLL = '/poll/:id/edit',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile',
  NOT_FOUND = '/404',
}

export enum ApiPaths {
  ME = '/admin/users/me',
  USERS = '/admin/users',
  PUBLIC_POLL = '/poll',
  POLL = '/admin/poll',
  SUBMISSION = '/submission',
  SET_ROLE = '/admin/users/role',
  LOGIN = '/admin/auth/login',
  LINK = '/admin/link',
  LINK_BY_URL = '/admin/link/url',
}
