import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  description: string;
  actorsId: string[];

  @IsString()
  imageUrl: string;
}


@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  create(@Body() dto: CreateMovieDTO) {
    console.log(dto instanceof CreateMovieDTO);

    return this.movieService.create(dto);
  }
}
