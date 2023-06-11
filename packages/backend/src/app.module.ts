import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LinksModule } from './links/links.module';
import { PollModule } from './poll/poll.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { RedirectModule } from './redirect/redirect.module';
import { UsersModule } from './users/users.module';
import configuration, { ConfigKeys } from './utils/configuration';

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
    PollModule,
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
