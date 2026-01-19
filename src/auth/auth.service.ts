import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequestDTO } from './auth.controller';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME = '24h';
  private readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME = '7d';
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(res: Response, dto: RegisterRequestDTO) {
    const { name = 'Unknown', email, password } = dto;
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });
    console.log('newUser: ', newUser);

    const { accessToken, refreshToken } = this.generateToken(newUser.id);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );
    console.log('accessToken: ', accessToken);

    return { accessToken };
  }
  async login(res: Response, dto: RegisterRequestDTO) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    const { accessToken, refreshToken } = this.generateToken(user.id);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  async validate(id: string) {
    const user = this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }
  async refreshToken(res: Response, req: Request) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Недействительный refresh-token');
    }

    const payload = this.jwtService.verify(refreshToken);
    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }
    }

    const { accessToken, refreshToken: newRefreshToken } = this.generateToken(
      payload.id,
    );
    this.setCookie(
      res,
      newRefreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }
  private generateToken(id: string) {
    const payload: { id: string } = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  }
  private setCookie(res: Response, token: string, expires: Date) {
    res.cookie('refresh_token', token, {
      httpOnly: true, // js-браузера не сможет их прочитать(только сервак может отправлять и получать)
      domain: 'localhost',
      expires,
    });
  }
}
