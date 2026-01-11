import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequestDTO } from './auth.controller';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly JWT_SECRET = 'mazaka';
    private readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME = '24h';
    private readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME = '7d';


    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService,) {
    }



    private generateToken(id: string) {
        const payload: { id: string } = { id }

        const accessToken = this.jwtService.sign(payload, { expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: this.JWT_REFRESH_TOKEN_EXPIRATION_TIME })

        return { accessToken, refreshToken };
    }

    async register(dto: RegisterRequestDTO) {
        const { name = "Unknown", email, password
        } = dto;
        const existUser = await this.prismaService.user.findUnique({
            where: { email }
        });
        if (existUser) {
            throw new Error('User with this email already exists');
        }

        const newUser = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: await hash(password),
            }
        });

        return this.generateToken(newUser.id);
    }

    async login(dto: RegisterRequestDTO) {
        const { email, password } = dto;
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        return this.generateToken(user.id);
    }
}
