import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosterModel } from './model/poster.model';

@Module({
  controllers: [PosterController],
  providers: [PosterService],

  // ✅ Загружаем таблицу в БД
  imports: [TypeOrmModule.forFeature([PosterModel])],
})
export class PosterModule {}
