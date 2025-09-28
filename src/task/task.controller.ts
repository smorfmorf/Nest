import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { StartWith } from './decorator/start-with.decorator';

// export enum TaskTag {
//   WORK = 'work',
//   HOME = 'home',
//   LEARNING = 'learning',
// }

// DTO (Объект получаемый от клиента) - какие данные ждем от клиента
export class CreateDto {
  @IsString({ message: 'Поле title строка!' })
  @IsNotEmpty()
  @StartWith('Task', { message: 'Название должно начинаться c Task' })
  title: string;

  @IsArray()
  @IsString({ each: true, message: 'Поле tags строка!' })
  // @IsEnum(TaskTag, { message: 'Недопустимое значение тега', each: true })
  @IsOptional()
  tags: string[];

  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
  })
  password: string;
}

export class UpdateDto {
  @IsString({ message: 'Надо строку' })
  @IsNotEmpty()
  title: string;
  status: string;
}

@Controller('task')
export class TaskController {
  // через конструктор внедряем TaskService
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Ip() ip: string) {
    console.log('ip: ', ip);
    return this.taskService.findAll();
  }

  //http://localhost:3000/task/kfkdwoc
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(Number(id));
  }

  @Post()
  create(@Body() dto: CreateDto) {
    return this.taskService.create(dto);
  }

  // чтобы получить динамический параметр @Param
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.taskService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }

  //? Пример вызова сервиса с другого модуля
  @Get('/movie/test')
  test(@Req() req: Request) {
    console.log('req: ', req.url);
    return this.taskService.test();
  }
}
