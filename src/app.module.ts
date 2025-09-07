import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// точка входа // nest g res movie --no-spec (моудль указывает какие Компоненты входят в этот модуль)

@Module({
  // тут подключаем стороние либы чтобы они были доступны по всему App
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
  ], // тут импортим другие модули
  controllers: [AppController], //controllers - обрабатывают HTTP запросы
  providers: [AppService], // service - содержит логику
})
export class AppModule {}
