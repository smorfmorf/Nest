import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

export class RegisterRequestDTO {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDTO,
  ) {
    return this.authService.register(res, dto);
  }

  @Post('login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDTO,
  ) {
    return this.authService.login(res, dto);
  }

  @Post('refreshToken')
  @HttpCode(200)
  refreshToken(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.refreshToken(res, req);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('@me')
  async me(@Req() req: Request) {
    return req.user;
  }
}
