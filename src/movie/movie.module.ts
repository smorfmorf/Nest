import { MovieModel } from './model/movie.model';
import { Global, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global() // Глобальный модуль и не нужно в каждом модуле импортировать, а только в App
@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],

  imports: [TypeOrmModule.forFeature([MovieModel])], // ✅ Загружаем таблицу в БД
})
export class MovieModule {}
