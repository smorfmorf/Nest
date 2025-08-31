import { MovieModel } from './model/movie.model';
import { Global, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global() // делает модуль глобальным и не нужно в каждом модуле делать импорт, а только в app.module
@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])], // ✅ Загружаем таблицу в БД
  controllers: [MovieController],
  providers: [MovieService],
  //Service будет доступен в других модулях
  exports: [MovieService],
})
export class MovieModule {}
