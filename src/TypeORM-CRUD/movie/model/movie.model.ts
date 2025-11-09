import { ActorModel } from 'src/TypeORM-CRUD/actor/model/actor.model';
import { PosterModel } from 'src/TypeORM-CRUD/poster/model/poster.model';
import { ReviewModel } from 'src/TypeORM-CRUD/review/model/review.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('moviesUmbrella')
export class MovieModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    default: '',
  })
  title: string;

  @Column({
    name: 'release_year',
    type: 'int',
    default: 0,
  })
  releaseYear: number;

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ReviewModel, (review) => review.movie)
  reviews: ReviewModel[];

  // Многие фильмы могут иметь много актёров
  @ManyToMany(() => ActorModel, (actor) => actor.movies)

  // 👈 промежуточная таблица, когда M-T-M создается промежуточная таблица которая хранит в себе 2 идентификатора id актера и id фильма
  @JoinTable({
    name: 'movie_actors',
    // коллонка ссылки на фильм
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorModel[];

  @OneToOne(() => PosterModel, (poster) => poster.movie, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' }) // задаём имя внешнего ключа
  poster: PosterModel | null; // nullable
}
