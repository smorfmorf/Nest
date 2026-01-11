import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  register(@Body() dto: RegisterRequestDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: RegisterRequestDTO) {
    return this.authService.login(dto);
  }



}
