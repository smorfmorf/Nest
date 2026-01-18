import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerPipe } from './global/stringToLower.pipe';
import { AuthGuard } from './global/auth.guard';
import { UserAgent } from './global/userAgent.decorator';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiOperation({
    summary: 'Получение приветственного сообщения',
    description: 'Просто возвращает строку'
  })
  @ApiResponse({ status: 200, description: 'Успешный ответ' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerPipe)
  @ApiBody({ schema: { properties: { title: { type: 'string' } } } }) // для Swagger
  @Post()
  postHello(@UserAgent() userAgent: string, @Body('title') title: string) {
    return `UserAgent() ${userAgent}: string, Pipe ${title}`;
  }


  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-Custom-Token',  // имя header
    description: 'Кастомный токен клиента',
    required: false,
  })
  @UseGuards(AuthGuard)
  @Get('@me')
  getMe(@Param('me') me: string, @Headers('X-Custom-Token') customToken?: string) {
    return `Мой профиль ${me}, customToken ${customToken}`;
  }
}
