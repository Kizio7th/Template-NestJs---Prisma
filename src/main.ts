import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import { format, transports } from 'winston';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions, swaggerTitle, swaggerDescription } from './common';
import { ValidationExceptionFilter } from './filter/validation-exception.filter';
export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          maxsize: 5 * 1024 * 1024, // 5MB
          maxFiles: 7, // Keep 7 log files
          tailable: true,
          zippedArchive: false,
        }),
        // Log file for all activity
        new transports.File({
          filename: 'logs/activity.log',
          format: format.combine(format.timestamp(), format.json()),
          maxsize: 5 * 1024 * 1024, // 5MB
          maxFiles: 7, // Keep 7 log files
          tailable: true,
          zippedArchive: false,
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
  });
  app.setGlobalPrefix('api');
  const CONFIG_SERVICE = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);

  app.enableCors({
    origin: CONFIG_SERVICE.get('CORS_ORIGIN'),
    credentials: true,
  });

  app.use(helmet({ contentSecurityPolicy: false }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.useGlobalPipes(new ValidationExceptionFilter({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger Configuration --------------------------------

  // swaggerOptions, swaggerTitle, swaggerDescription variables are customized and defined in common/swagger/swagger.config.ts

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  // End Swagger Configurations --------------------------------


  await app.listen(CONFIG_SERVICE.get('PORT'), () =>
    logger.log(`Application running on port ${CONFIG_SERVICE.get('PORT')}`),
  );
}
bootstrap();
