import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerPipe } from './global/stringToLower.pipe';
import { AuthGuard } from './global/auth.guard';
import { UserAgent } from './global/userAgent.decorator';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

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
  @Post()
  postHello(@Body('title') title: string) {
    return `Pipe ${title}`;
  }

  @ApiHeader({ name: 'X-Auth-Token', description: 'Информация о клиенте' })
  @ApiBody({ schema: { properties: { userAgent: { type: 'string' } } } })
  @UseGuards(AuthGuard)
  @Get('@me')
  getMe(@UserAgent() userAgent: string, @Param('me') me: string) {
    return `Мой профиль ${userAgent}`;
  }
}
