import { MovieModel } from 'src/TypeORM-CRUD/movie/model/movie.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('actorsUmbrella')
export class ActorModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  // Один актёр может сниматься во многих фильмах
  @ManyToMany(() => MovieModel, (movie) => movie.actors)
  movies: MovieModel[];
}
