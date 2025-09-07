import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validator  - проверка данных через Декораторы
  // class-transformer - автоматически преобразовывать данные в нужный формат

  // делаем валидацию для всех входящих запросов
  app.useGlobalPipes(new ValidationPipe());

  console.log('http://localhost:3000');
  await app.listen(3000);
}

bootstrap();
// app.setGlobalPrefix('api');
