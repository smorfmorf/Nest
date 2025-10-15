import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  actorsId: string[];

  @IsString()
  imageUrl: string;
}

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateMovieDTO) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateMovieDTO) {
    return this.movieService.update(id, dto);
  }
}
