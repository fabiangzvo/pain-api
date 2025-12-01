import { loadEnvFile } from 'process';

loadEnvFile();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { ExceptionsFilter } from '@common/filters/exceptions/exceptions.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3001;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ExceptionsFilter());

  await app.listen(port, () => {
    Logger.log(`Application is running on port: ${port}`, 'Main');
  });
}
void bootstrap();
