import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ActorModel } from './model/actor.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActorModel])],
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
