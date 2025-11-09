import { Injectable } from '@nestjs/common';
import { Movie, MoviePoster } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDTO } from './movie.controller';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        releaseYear: 'desc',
      },
      include: {
        actors: true,
        poster: true,
      },
    });
  }

  async create(dto: CreateMovieDTO) {
    const { title, releaseYear, actorsId, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        // найти несколько актеров
        id: {
          in: actorsId,
        },
      },
    });

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
      },
      include: {
        actors: true,
        poster: true,
      },
    });

    return movie;
  }
}
