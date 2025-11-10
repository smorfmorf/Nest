import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerPipe } from './global/stringToLower.pipe';
import { AuthGuard } from './global/auth.guard';
import { UserAgent } from './global/userAgent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerPipe)
  @Post()
  postHello(@Body('title') title: string) {
    return `Pipe ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getMe(@UserAgent() userAgent: string) {
    return `Мой профиль ${userAgent}`;
  }
}
