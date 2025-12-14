import { Movie } from 'generated/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDTO } from './movie.controller';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) { }

  async findAll(): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({
      where: {
        isPublic: false,
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
    try {
      const { title, releaseYear, actorsId, imageUrl, description } = dto;

      const actors = await this.prismaService.actor.findMany({
        where: {
          // найти несколько актеров
          id: {
            in: Array.isArray(actorsId) ? actorsId : [actorsId],
          },
        },
      });

      const movie = await this.prismaService.movie.create({
        data: {
          title,
          releaseYear,
          description,
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
    catch (err) {
      console.log(err)
    }
  }
}
