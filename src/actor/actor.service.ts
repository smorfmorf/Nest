import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorModel } from './model/actor.model';
import { Repository } from 'typeorm';
import { CreateActorDTO } from './actor.controller';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorModel) //Инжектим модель
    private actorRepository: Repository<ActorModel>,
  ) {}

  async create(dto: CreateActorDTO) {
    const actor = this.actorRepository.create(dto);

    return await this.actorRepository.save(actor);
  }
}
