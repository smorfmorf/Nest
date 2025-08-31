import { MovieService } from './../movie/movie.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto/dto';

@Injectable()
export class TaskService {
  constructor(private movieService: MovieService) {}

  private tasks = [
    {
      id: 1,
      title: 'Task 1',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Task 2',
      status: 'pending',
    },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  create(dto: CreateDto) {
    const { title, tags = [] } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      tags,
      status: 'pending',
    };
    this.tasks.push(newTask);

    return newTask;
  }

  update(id: number, dto: UpdateDto) {
    const task = this.findById(id);
    Object.assign(task, dto);

    return task;
  }

  delete(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return task;
  }

  test() {
    return this.movieService.getMovie();
  }
}
