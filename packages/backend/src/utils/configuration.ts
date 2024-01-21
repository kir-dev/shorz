import * as process from 'process';

export default () => ({
  admin_site: process.env.ADMIN_SITE,
  oauth_base_url: process.env.OAUTH_BASE_URL,
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
  oauth_redirect_uri: process.env.OAUTH_REDIRECT_URI,
  mongodbUri: process.env.MONGODB_URI,
  expiration: process.env.JWT_EXPIRATION || '1h',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET || 'undefined_secret',
});

export enum ConfigKeys {
  ADMIN_SITE = 'admin_site',
  OAUTH_REDIRECT_URI = 'oauth_redirect_uri',
  OAUTH_BASE_URL = 'oauth_base_url',
  OAUTH_CLIENT_ID = 'oauth_client_id',
  OAUTH_CLIENT_SECRET = 'oauth_client_secret',
  EXPIRATION = 'expiration',
  MONGODB_URI = 'mongodbUri',
  PORT = 'port',
  SECRET = 'secret',
}
