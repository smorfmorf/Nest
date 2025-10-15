import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() dto: CreateActorDTO) {
    return this.actorService.create(dto);
  }
}
