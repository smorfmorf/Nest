import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    // Передаем управление следующему обработчику или контролеру
    next();
  }
}

//2-ой способ: если подключаем в main.ts через app.use()
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...', req.method, req.url);
  next();
}
