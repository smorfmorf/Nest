import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { MovieModel } from '../../movie/model/movie.model';

@Entity('postersUmbrella')
export class PosterModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  url: string;

  @OneToOne(() => MovieModel, (movie) => movie.poster)
  movie: MovieModel;
}
