import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Request, Response } from 'express';

export class RegisterRequestDTO {
  @IsString({ message: "Name must be a string" })
  @IsOptional()
  name?: string;
  @IsString({ message: "Email must be a string" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;
  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterRequestDTO) {
    return this.authService.register(res, dto);
  }

  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterRequestDTO) {
    return this.authService.login(res, dto);
  }

  @Post('refresh')
  @HttpCode(200)
  checkAuth(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.checkAuth(res, req);
  }



}
