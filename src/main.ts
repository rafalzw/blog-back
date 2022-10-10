import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: config.corsOrigin, credentials: true });

  app.setGlobalPrefix('api');
  app.useStaticAssets(path.join(__dirname, '..', 'storage/post-photos'), {
    prefix: '/api/post-photos',
  });
  app.useStaticAssets(path.join(__dirname, '..', 'storage/user-photos'), {
    prefix: '/api/user-photos',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
