/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['randomkey'],
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(4002);
}
bootstrap();
