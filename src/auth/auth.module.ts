import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        // secret: process.env.JWT_SECRET,
        secret: 'mazaka',
        signOptions: { expiresIn: '24h' },
        verifyOptions: { algorithms: ['HS256'], ignoreExpiration: false },
      }),
    }),
  ],
})
export class AuthModule {}
