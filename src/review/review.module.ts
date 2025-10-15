import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModel } from './model/review.model';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewModel])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
