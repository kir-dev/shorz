import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(AppModule.port, () => {
    Logger.log('App listening on ' + AppModule.port);
  });
}

bootstrap();
