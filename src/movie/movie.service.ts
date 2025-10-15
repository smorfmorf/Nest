import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieModel } from './model/movie.model';
import { CreateMovieDTO } from './movie.controller';
import { ActorModel } from 'src/actor/model/actor.model';
import { PosterModel } from 'src/poster/model/poster.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieModel) //Инжектим модель
    private movieRepository: Repository<MovieModel>,
    @InjectRepository(ActorModel)
    private actorRepository: Repository<ActorModel>,
    @InjectRepository(PosterModel)
    private posterRepository: Repository<PosterModel>,
  ) {}

  async create(dto: CreateMovieDTO): Promise<MovieModel> {
    const { title, releaseYear, actorsId, imageUrl } = dto;

    let poster: PosterModel | null;
    if (imageUrl) {
      poster = this.posterRepository.create({ url: imageUrl });
      await this.posterRepository.save(poster);
    }

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorsId),
      },
    });
    if (!actors) {
      throw new NotFoundException('Actor not found');
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      actors,
      poster,
    });

    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<MovieModel[]> {
    return await this.movieRepository.find({
      where: {
        isPublic: false,
      },
      select: {
        id: true,
        title: true,
        releaseYear: true,
      },
      //Смотрим какое поле в модели отвечает за Many-to-Many
      relations: ['actors'],
    });
  }

  async findById(id: number): Promise<MovieModel> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: number, dto: CreateMovieDTO): Promise<MovieModel> {
    const movie = await this.movieRepository.findOneById(id);

    Object.assign(movie, dto);

    return await this.movieRepository.save(movie);
  }

  getMovie() {
    return { message: 'Я Movie импорт сервиса из другого модуля' };
  }
}
