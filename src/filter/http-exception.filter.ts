import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '../utils/baseReponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(403).send(exception.getResponse());
  }
}
