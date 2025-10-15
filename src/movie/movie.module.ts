import { MovieModel } from './model/movie.model';
import { Global, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorModel } from 'src/actor/model/actor.model';
import { PosterModel } from 'src/poster/model/poster.model';

@Global() // Глобальный модуль и не нужно в каждом модуле импортировать, а только в App
@Module({
  exports: [MovieService],
  controllers: [MovieController],
  providers: [MovieService],

  // ✅ Загружаем таблицу в БД
  imports: [TypeOrmModule.forFeature([MovieModel, ActorModel, PosterModel])],
})
export class MovieModule {}
