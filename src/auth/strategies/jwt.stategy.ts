import { applyDecorators, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // настройка паспорта, стратегии
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mazaka',
      algorithms: ['HS256'],
    });
  }

  //   принимает данные токена, если он валиден вызывается автоматически
  async validate(payload: any) {
    return await this.authService.validate(payload.id);
  }
}
