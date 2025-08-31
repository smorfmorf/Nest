import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieModel } from './model/movie.model';
import { CreateMovieDTO } from './dto/movie-dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieModel) //Внедрение репозитория для работы с табл
    private movieRepository: Repository<MovieModel>,
  ) {}

  async findAll(): Promise<MovieModel[]> {
    return await this.movieRepository.find({
      where: {
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
      },
    });
  }

  async findById(id: number): Promise<MovieModel> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async create(dto: CreateMovieDTO): Promise<MovieModel> {
    const movie = this.movieRepository.create(dto);
    return await this.movieRepository.save(movie);
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
