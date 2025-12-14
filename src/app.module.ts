import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActorModule } from './actor/actor.module';
import { MovieModule } from './movie/movie.module';
import { LoggerMiddleware } from './global/logger.middleware';
// точка входа приложения (тут объединяем все остальные модули в один)
// //! "cmd nest g res movie --no-spec"
@Module({
  imports: [
    // TaskModule,
    // MovieModule,
    // ReviewModule,
    // ActorModule,
    // PosterModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5433,
    //   username: 'postgres',
    //   password: '123456',
    //   database: 'NestDB',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    PrismaModule,
    ActorModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // указываем пути на каких будет работать
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

// в imports - подключаем стороние либы чтобы они были доступны по всему App
// controllers - обрабатывают входящие URL - HTTP запросы
// service - содержит логику (мозг приложения, обращение к БД)\
//?
// Module - чтобы объединить все вещи между собой, также можно импорировать доп классы и они будут доступны в контролере и в сервисе
// контролер обрабатывает URL адресса, а в сервисе что будет происходить при переходе по определенному URL адресу.
