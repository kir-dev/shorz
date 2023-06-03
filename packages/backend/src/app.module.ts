import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration, { ConfigKeys } from './utils/configuration';
import { LinksModule } from './links/links.module';
import { RedirectModule } from './redirect/redirect.module';
import { QrcodeModule } from './qrcode/qrcode.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>(ConfigKeys.MONGODB_URI),
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    LinksModule,
    RedirectModule,
    QrcodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string;

  constructor(private configService: ConfigService) {
    AppModule.port = configService.get<string>(ConfigKeys.PORT);
  }
}
