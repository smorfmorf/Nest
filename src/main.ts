import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './global/auth.guard';
import { ResponseInterceptor } from './global/response.interceptor';
import { AllExceptionsFilter } from './global/filters.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

// точка входа настройка сервера и запуск приложения (для глобальных настроек)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());



  // делаем валидацию для всех входящих запросов
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  //! Swagger API doc
  const config = new DocumentBuilder()
    .setTitle('Project Ambrella')
    .setDescription('The Project Ambrella API description')
    .addBearerAuth()
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  console.log('http://localhost:3000');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

// app.setGlobalPrefix('api');
