import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    // console.log(exception);

    const ctx = host.switchToHttp();

    const response = ctx.getResponse() as Response;

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'internal server error';

    this.logger.error(message);

    response.status(status).json({
      status,
      message,
      timestamp: new Date().toLocaleString(),
      path: ctx.getRequest().url,
    });
  }
}
