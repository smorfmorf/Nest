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
import { CreateDto, UpdateDto } from './dto/dto';

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

  @Get('/movie/test')
  test(@Req() req: Request) {
    console.log('req: ', req.url);
    return this.taskService.test();
  }
}
