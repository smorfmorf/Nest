import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// точка входа приложения (тут объединяем все остальные модули в один)
@Module({
  imports: [
    TaskModule,
    MovieModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'max001195164',
      database: 'NestDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// в imports - подключаем стороние либы чтобы они были доступны по всему App
// controllers - обрабатывают входящие HTTP запросы
// service - содержит логику (мозг приложения)
// "cmd nest g res movie --no-spec"
