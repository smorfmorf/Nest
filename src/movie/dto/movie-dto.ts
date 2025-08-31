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
}
