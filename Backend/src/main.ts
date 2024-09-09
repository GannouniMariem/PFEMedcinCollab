import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  // Configure CORS
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   credentials: true,
  // });

  // Configure ValidationPipe pour valider automatiquement les DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Récupère PrismaService et active les hooks de fermeture
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(5000); // Assurez-vous que le port est correct
}
bootstrap();
