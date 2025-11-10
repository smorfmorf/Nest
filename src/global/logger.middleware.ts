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
