import { createParamDecorator } from '@nestjs/common';

export const UserAgent = createParamDecorator((data: any, context) => {
  const request = context.switchToHttp().getRequest();

  return request.headers['user-agent'];
});
