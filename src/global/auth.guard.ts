import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    return true;
  }
}

// в реальности если без паспорта делаем (расшифровываем токен через JWT и извлекаем id пользователя и проверяем его в Бд-ORM)
/* 
 1) в реальности если без паспорта делаем (расшифровываем токен через JWT)
 2) извлекаем id пользователя и проверяем его в Бд-ORMкой
 3) инжектим призму через конструктор


*/
