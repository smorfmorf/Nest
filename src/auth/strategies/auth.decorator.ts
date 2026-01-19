import {
  applyDecorators,
  createParamDecorator,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createParam } from 'generated/prisma/runtime/library';

export function Authorize() {
  // используем гвард в качестве декоратора
  return applyDecorators(UseGuards(JwtGuard));
}

//! guard
export class JwtGuard extends AuthGuard('jwt') {}
// ----------------------------------------------------

// декоратор для параметров, получить пользователя
export const Authorized = createParamDecorator((data: any, context) => {
  const request = context.switchToHttp().getRequest();

  const user = request.user;

  //@Authorized('id) id string - возвращает только 1 поле
  return data ? user[data] : user;
});
