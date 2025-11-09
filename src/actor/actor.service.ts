import { Injectable } from '@nestjs/common';
import { Actor } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDTO } from './actor.controller';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDTO): Promise<Actor> {
    const { name } = dto;

    const actor = await this.prismaService.actor.create({
      data: {
        name,
      },
    });

    return actor;
  }
}
