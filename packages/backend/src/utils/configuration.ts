import * as process from 'process';

export default () => ({
  admin_site: process.env.ADMIN_SITE,
  authSch_client_id: process.env.AUTHSCH_CLIENT_ID,
  authSch_client_secret: process.env.AUTHSCH_CLIENT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  expiration: process.env.JWT_EXPIRATION || '1h',
  port: parseInt(process.env.PORT, 10) || 3000,
  secret: process.env.SECRET || 'undefined_secret',
});

export enum ConfigKeys {
  ADMIN_SITE = 'admin_site',
  AUTHSCH_CLIENT_ID = 'authSch_client_id',
  AUTHSCH_CLIENT_SECRET = 'authSch_client_secret',
  EXPIRATION = 'expiration',
  MONGODB_URI = 'mongodbUri',
  PORT = 'port',
  SECRET = 'secret',
}
