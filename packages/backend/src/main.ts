import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transformOptions: { excludeExtraneousValues: true }, transform: true }));
  app.enableCors();
  await app.listen(AppModule.port, () => {
    Logger.log('App listening on ' + AppModule.port);
  });
}

bootstrap();
