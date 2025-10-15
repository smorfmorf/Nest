import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MovieModel } from '../../movie/model/movie.model';

@Entity('reviesUmbrella')
@Entity()
export class ReviewModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  content: string;

  @ManyToOne(() => MovieModel, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' }) // 👈 Явно указываем имя колонки
  movie: MovieModel;
}
